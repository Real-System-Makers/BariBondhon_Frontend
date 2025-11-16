"use server";

import { cookies } from "next/headers";
import {
  AuthResponse,
  LoginCredentials,
  SignUpData,
  User,
  AuthActionResponse,
} from "../types/auth.types";
import { ApiClient } from "../utils/api-client";

const SEVEN_DAYS = 7 * 24 * 60 * 60;
const THIRTY_DAYS = 30 * 24 * 60 * 60;

export async function setAuthCookies(tokens: AuthResponse): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set("access_token", tokens.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SEVEN_DAYS,
    path: "/",
  });

  cookieStore.set("refresh_token", tokens.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: THIRTY_DAYS,
    path: "/",
  });
}

export async function clearAuthCookies(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete("access_token");
  cookieStore.delete("refresh_token");
}

export async function loginAction(
  credentials: LoginCredentials
): Promise<AuthActionResponse<User>> {
  try {
    const tokens = await ApiClient.post<AuthResponse>(
      "/auth/login",
      credentials,
      {
        skipAuth: true,
      }
    );

    await setAuthCookies(tokens);

    const user = await ApiClient.get<User>("/auth/me");

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Login failed. Please try again.",
    };
  }
}

export async function signupAction(
  data: SignUpData
): Promise<AuthActionResponse<User>> {
  try {
    const tokens = await ApiClient.post<AuthResponse>("/auth/signup", data, {
      skipAuth: true,
    });

    await setAuthCookies(tokens);

    const user = await ApiClient.get<User>("/auth/me");

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Signup failed. Please try again.",
    };
  }
}

export async function logoutAction(): Promise<AuthActionResponse> {
  try {
    await ApiClient.post("/auth/logout");
    await clearAuthCookies();

    return {
      success: true,
    };
  } catch (error: any) {
    await clearAuthCookies();

    return {
      success: false,
      error: error.message || "Logout failed.",
    };
  }
}

export async function refreshTokenAction(): Promise<
  AuthActionResponse<AuthResponse>
> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const tokens = await ApiClient.post<AuthResponse>(
      "/auth/refresh",
      { refreshToken },
      { skipAuth: true }
    );

    await setAuthCookies(tokens);

    return {
      success: true,
      data: tokens,
    };
  } catch (error: any) {
    await clearAuthCookies();

    return {
      success: false,
      error: error.message || "Token refresh failed.",
    };
  }
}

export async function getCurrentUserAction(): Promise<
  AuthActionResponse<User>
> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const user = await ApiClient.get<User>("/auth/me");

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    if (error.statusCode === 401) {
      await clearAuthCookies();
    }

    return {
      success: false,
      error: error.message || "Failed to fetch user data.",
    };
  }
}

export async function checkAuthStatus(): Promise<boolean> {
  const cookieStore = await cookies();
  return !!cookieStore.get("access_token")?.value;
}
