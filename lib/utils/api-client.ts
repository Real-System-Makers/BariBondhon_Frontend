import { cookies } from "next/headers";
import { ApiError } from "../types/auth.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export class ApiClient {
  private static async getAccessToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get("access_token")?.value;
  }

  private static async getRefreshToken(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get("refresh_token")?.value;
  }

  static async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { skipAuth = false, headers = {}, ...restOptions } = options;

    const requestHeaders: HeadersInit = {
      "Content-Type": "application/json",
      ...headers,
    };

    if (!skipAuth) {
      const accessToken = await this.getAccessToken();
      if (accessToken) {
        (requestHeaders as Record<string, string>)[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      }
    }

    const url = `${API_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...restOptions,
        headers: requestHeaders,
      });

      if (!response.ok) {
        if (response.status === 401 && !skipAuth) {
          const refreshed = await this.attemptTokenRefresh();
          if (refreshed) {
            return this.request<T>(endpoint, options);
          }
        }

        const errorData = await response.json().catch(() => ({
          message: "An error occurred",
        }));

        throw {
          message: errorData.message || "Request failed",
          statusCode: response.status,
        } as ApiError;
      }

      if (response.status === 204) {
        return {} as T;
      }

      return await response.json();
    } catch (error) {
      if ((error as ApiError).statusCode) {
        throw error;
      }
      throw {
        message: "Network error. Please check your connection.",
        statusCode: 0,
      } as ApiError;
    }
  }

  private static async attemptTokenRefresh(): Promise<boolean> {
    try {
      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        return false;
      }

      const tokens = await response.json();

      const { setAuthCookies } = await import("../actions/auth.actions");
      await setAuthCookies(tokens);

      return true;
    } catch {
      return false;
    }
  }

  static async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  static async post<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  static async put<T>(
    endpoint: string,
    data?: unknown,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  static async delete<T>(
    endpoint: string,
    options?: RequestOptions
  ): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}
