export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

export interface AuthActionResponse<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}
