import { Role } from "../constants/role";
import { House } from "./house";

export interface User {
  _id: string;
  name: string;
  email: string;
  address?: string;
  phone: string;
  role: Role;
  flat?: {
    _id: string;
    name: string;
  };
  owner?: {
    _id: string;
    name: string;
    email: string;
    address?: string;
    house?: House;
  };
  bKashNumber?: string;
  bankDetails?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
  };
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
  phone: string;
  role: Role;
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
