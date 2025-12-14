"use server";

import { revalidatePath } from "next/cache";
import { ApiClient } from "../utils/api-client";

export interface MoveOutRequestDto {
  moveOutMonth: string;
  note?: string;
}

export interface UpdateMoveOutRequestActionDto {
  status: "PENDING" | "APPROVED" | "REJECTED";
  moveOutMonth?: string;
}

export async function getNoticePeriodAction(): Promise<{ minimumNoticePeriod: number; hasActiveRequest?: boolean; activeRequest?: any } | null> {
  try {
    return await ApiClient.get<{ minimumNoticePeriod: number; hasActiveRequest?: boolean; activeRequest?: any }>("/move-out/config");
  } catch (error) {
    console.error("Failed to fetch notice period:", error);
    return null;
  }
}

export async function setNoticePeriodAction(
  period: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await ApiClient.patch("/move-out/config", { minimumNoticePeriod: period });
    revalidatePath("/owner-home");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to set notice period:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to set notice period",
    };
  }
}

export async function createMoveOutRequestAction(
  data: MoveOutRequestDto
): Promise<{ success: boolean; error?: string }> {
  try {
    await ApiClient.post("/move-out/request", data);
    revalidatePath("/owner-home"); // Owner sees new request
    revalidatePath("/tenant-home"); // Tenant sees status
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create move out request:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to create move out request",
    };
  }
}

export async function getOwnerMoveOutRequestsAction() {
    try {
        return await ApiClient.get<any[]>("/move-out/requests");
    } catch (error) {
        console.error("Failed to fetch move out requests:", error);
        return [];
    }
}

export async function updateMoveOutRequestAction(
    id: string,
    data: UpdateMoveOutRequestActionDto
): Promise<{ success: boolean; error?: string }> {
    try {
        await ApiClient.patch(`/move-out/request/${id}`, data);
        revalidatePath("/owner-home");
        revalidatePath("/tenant-home");
        return { success: true };
    } catch (error: any) {
        console.error("Failed to update move out request:", error);
        return {
            success: false,
            error: error.response?.data?.message || "Failed to update move out request",
        };
    }
}
