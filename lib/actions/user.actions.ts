"use server";

import { revalidatePath } from "next/cache";
import { ApiClient } from "../utils/api-client";
import { User } from "../types/auth.types";

export interface UpdateUserDto {
    name?: string;
    phone?: string;
    address?: string;
    bKashNumber?: string;
    bankDetails?: {
        accountName: string;
        accountNumber: string;
        bankName: string;
        branchName: string;
    };
}

export async function updateUserAction(
    userId: string,
    data: UpdateUserDto
): Promise<{ success: boolean; error?: string; data?: User }> {
    try {
        const updatedUser = await ApiClient.patch<User>(`/user/${userId}`, data);
        revalidatePath("/owner-profile");
        revalidatePath("/owner-home");
        return { success: true, data: updatedUser };
    } catch (error: any) {
        console.error("Failed to update user:", error);
        return {
            success: false,
            error: error.message || "Failed to update profile",
        };
    }
}
