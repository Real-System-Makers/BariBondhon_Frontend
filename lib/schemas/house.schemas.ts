import * as yup from "yup";
import { InferType } from "yup";


export const houseSettingsSchema = yup.object().shape({
  division: yup
    .string()
    .required("Division is required"),
  district: yup
    .string()
    .required("District is required"),
  policeStation: yup
    .string()
    .required("Police station is required")
    .min(2, "Police station must be at least 2 characters"),
  address: yup
    .string()
    .required("Address is required")
    .min(5, "Address must be at least 5 characters"),
  registrationNumber: yup
    .string()
    .required("Registration number is required")
    .min(3, "Registration number must be at least 3 characters"),
});

export type HouseSettingsFormData = InferType<typeof houseSettingsSchema>;

