"use server";

import { revalidatePath } from "next/cache";
import { Notification } from "../types/notification";
import { ApiClient } from "../utils/api-client";

export async function getNotificationsAction(
  unreadOnly = false
): Promise<Notification[]> {
  try {
    const url = unreadOnly
      ? "/notifications?unreadOnly=true"
      : "/notifications";
    return await ApiClient.get<Notification[]>(url);
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return [];
  }
}

export async function getUnreadCountAction(): Promise<number> {
  try {
    const count = await ApiClient.get<number>("/notifications/unread-count");
    return count;
  } catch (error) {
    console.error("Failed to fetch unread count:", error);
    return 0;
  }
}

export async function markAsReadAction(
  id: string
): Promise<{ success: boolean }> {
  try {
    await ApiClient.patch(`/notifications/${id}/read`, {});
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to mark as read:", error);
    return { success: false };
  }
}

export async function markAllAsReadAction(): Promise<{
  success: boolean;
  modifiedCount?: number;
}> {
  try {
    const result = await ApiClient.patch<{ modifiedCount: number }>(
      "/notifications/mark-all-read",
      {}
    );
    revalidatePath("/");
    return { success: true, modifiedCount: result.modifiedCount };
  } catch (error) {
    console.error("Failed to mark all as read:", error);
    return { success: false };
  }
}

export async function deleteNotificationAction(
  id: string
): Promise<{ success: boolean }> {
  try {
    await ApiClient.delete(`/notifications/${id}`);
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete notification:", error);
    return { success: false };
  }
}
