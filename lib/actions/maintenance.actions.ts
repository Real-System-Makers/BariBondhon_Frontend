"use server";

import { ApiClient } from "@/lib/utils/api-client";
import { revalidatePath } from "next/cache";
import {
  MaintenanceRequest,
  MaintenanceStats,
  CreateMaintenanceRequestDto,
  UpdateStatusDto,
  AddReplyDto,
  MaintenanceStatus,
} from "@/lib/types/maintenance";

export const createMaintenanceRequestAction = async (
  data: CreateMaintenanceRequestDto
) => {
  try {
    await ApiClient.post("/maintenance", data);
    revalidatePath("/complain/issue");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create maintenance request:", error);
    return {
      success: false,
      error: error.message || "Failed to create maintenance request",
    };
  }
};

export const getMaintenanceRequestsAction = async (
  status?: MaintenanceStatus
): Promise<MaintenanceRequest[]> => {
  try {
    const query = status ? `?status=${status}` : "";
    const requests = await ApiClient.get<MaintenanceRequest[]>(
      `/maintenance${query}`
    );
    return requests;
  } catch (error) {
    console.error("Failed to fetch maintenance requests:", error);
    return [];
  }
};

export const getMaintenanceStatsAction = async (): Promise<MaintenanceStats | null> => {
  try {
    const stats = await ApiClient.get<MaintenanceStats>("/maintenance/stats");
    return stats;
  } catch (error) {
    console.error("Failed to fetch maintenance stats:", error);
    return null;
  }
};

export const getMaintenanceRequestByIdAction = async (
  id: string
): Promise<MaintenanceRequest | null> => {
  try {
    const request = await ApiClient.get<MaintenanceRequest>(`/maintenance/${id}`);
    return request;
  } catch (error) {
    console.error("Failed to fetch maintenance request:", error);
    return null;
  }
};

export const updateMaintenanceStatusAction = async (
  id: string,
  data: UpdateStatusDto
) => {
  try {
    await ApiClient.patch(`/maintenance/${id}/status`, data);
    revalidatePath("/complain/view");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update maintenance status:", error);
    return {
      success: false,
      error: error.message || "Failed to update maintenance status",
    };
  }
};

export const addMaintenanceReplyAction = async (
  id: string,
  data: AddReplyDto
) => {
  try {
    await ApiClient.post(`/maintenance/${id}/reply`, data);
    revalidatePath("/complain/view");
    revalidatePath("/complain/issue");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add reply:", error);
    return {
      success: false,
      error: error.message || "Failed to add reply",
    };
  }
};

