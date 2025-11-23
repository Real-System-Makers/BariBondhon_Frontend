"use server";

import { revalidatePath } from "next/cache";
import {
  Rent,
  CreateRentDto,
  UpdateRentDto,
  RecordPaymentDto,
  GenerateRentsDto,
  RentStats,
  RentStatus,
} from "../types/rent";
import { ApiClient } from "../utils/api-client";

export async function getRentsAction(filters?: {
  month?: string;
  year?: number;
  status?: RentStatus;
  tenantId?: string;
}): Promise<Rent[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.month) params.append("month", filters.month);
    if (filters?.year) params.append("year", filters.year.toString());
    if (filters?.status) params.append("status", filters.status);
    if (filters?.tenantId) params.append("tenantId", filters.tenantId);

    const queryString = params.toString();
    const url = queryString ? `/rents?${queryString}` : "/rents";

    return await ApiClient.get<Rent[]>(url);
  } catch (error) {
    console.error("Failed to fetch rents:", error);
    return [];
  }
}

export async function getTenantRentsAction(): Promise<Rent[]> {
  try {
    return await ApiClient.get<Rent[]>("/rents/tenant");
  } catch (error) {
    console.error("Failed to fetch tenant rents:", error);
    return [];
  }
}

export async function getRentByIdAction(id: string): Promise<Rent | null> {
  try {
    return await ApiClient.get<Rent>(`/rents/${id}`);
  } catch (error) {
    console.error("Failed to fetch rent:", error);
    return null;
  }
}

export async function createRentAction(
  data: CreateRentDto
): Promise<{ success: boolean; error?: string; data?: Rent }> {
  try {
    const rent = await ApiClient.post<Rent>("/rents", data);
    revalidatePath("/owner-home");
    revalidatePath("/tenant-home");
    return { success: true, data: rent };
  } catch (error: any) {
    console.error("Failed to create rent:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create rent",
    };
  }
}

export async function updateRentAction(
  id: string,
  data: UpdateRentDto
): Promise<{ success: boolean; error?: string; data?: Rent }> {
  try {
    const rent = await ApiClient.patch<Rent>(`/rents/${id}`, data);
    revalidatePath("/owner-home");
    revalidatePath("/tenant-home");
    return { success: true, data: rent };
  } catch (error: any) {
    console.error("Failed to update rent:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update rent",
    };
  }
}

export async function recordPaymentAction(
  id: string,
  data: RecordPaymentDto
): Promise<{ success: boolean; error?: string; data?: Rent }> {
  try {
    console.log("Recording payment for rent:", id, "Data:", data);
    const rent = await ApiClient.patch<Rent>(`/rents/${id}/payment`, data);
    console.log("Payment recorded successfully:", rent);
    revalidatePath("/owner-home");
    revalidatePath("/tenant-home");
    return { success: true, data: rent };
  } catch (error: any) {
    console.error("Failed to record payment:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to record payment",
    };
  }
}

export async function deleteRentAction(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await ApiClient.delete(`/rents/${id}`);
    revalidatePath("/owner-home");
    revalidatePath("/tenant-home");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete rent:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete rent",
    };
  }
}

export async function generateMonthlyRentsAction(
  data: GenerateRentsDto
): Promise<{
  success: boolean;
  error?: string;
  message?: string;
  created?: number;
  skipped?: number;
}> {
  try {
    const result = await ApiClient.post<{
      created: number;
      skipped: number;
      message: string;
    }>("/rents/generate", data);
    revalidatePath("/owner-home");
    return { success: true, ...result };
  } catch (error: any) {
    console.error("Failed to generate rents:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to generate rents",
    };
  }
}

export async function getMonthlyStatsAction(
  month: string,
  year: number
): Promise<RentStats | null> {
  try {
    return await ApiClient.get<RentStats>(`/rents/stats/${month}/${year}`);
  } catch (error) {
    console.error("Failed to fetch rent statistics:", error);
    return null;
  }
}
