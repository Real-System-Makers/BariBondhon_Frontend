import * as yup from "yup";
import { InferType } from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required"),
  remember: yup.boolean().notRequired().default(false),
});

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  password: yup
    .string()
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords must match"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9+\-\s()]+$/, "Please enter a valid phone number")
    .min(11, "Phone number must be at least 11 digits"),
});

export type LoginFormData = InferType<typeof loginSchema>;
export type SignupFormData = InferType<typeof signupSchema>;
