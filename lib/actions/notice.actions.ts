"use server";

import { revalidatePath } from "next/cache";
import { Notice, CreateNoticeDto } from "../types/notice";
import { ApiClient } from "../utils/api-client";

export async function getNoticesAction(): Promise<Notice[]> {
  try {
    return await ApiClient.get<Notice[]>("/notices");
  } catch (error) {
    console.error("Failed to fetch notices:", error);
    return [];
  }
}

export async function createNoticeAction(
  data: CreateNoticeDto
): Promise<{ success: boolean; error?: string; data?: Notice }> {
  try {
    const notice = await ApiClient.post<Notice>("/notices", data);
    revalidatePath("/tenant-home");
    revalidatePath("/owner-home");
    return {
      success: true,
      data: notice,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Failed to create notice. Please try again.",
    };
  }
}

