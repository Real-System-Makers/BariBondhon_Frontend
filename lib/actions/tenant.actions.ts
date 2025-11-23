"use server";

import { ApiClient } from "@/lib/utils/api-client";
import { revalidatePath } from "next/cache";

export interface CreateTenantDto {
  name: string;
  email: string;
  phone: string;
  flatId?: string;
}

export interface Tenant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  flat?: {
    _id: string;
    name: string;
  } | null;
}

export const createTenantAction = async (data: CreateTenantDto) => {
  try {
    await ApiClient.post("/tenants", data);
    revalidatePath("/tenant-management");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create tenant:", error);
    return { success: false, error: error.message || "Failed to create tenant" };
  }
};

export async function assignTenantAction(tenantId: string, flatId: string) {
  try {
    await ApiClient.post("/tenants/assign", { tenantId, flatId });
    revalidatePath("/flat-management");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to assign tenant:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to assign tenant",
    };
  }
}

export async function updateTenantAction(id: string, data: Partial<Tenant>) {
  try {
    await ApiClient.patch(`/tenants/${id}`, data);
    revalidatePath("/tenant-management");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update tenant:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to update tenant",
    };
  }
}

export async function deleteTenantAction(id: string) {
  try {
    await ApiClient.delete(`/tenants/${id}`);
    revalidatePath("/tenant-management");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete tenant:", error);
    return {
      success: false,
      error: error.response?.data?.message || "Failed to delete tenant",
    };
  }
}

export const getTenantsAction = async (): Promise<Tenant[]> => {
  try {
    const tenants = await ApiClient.get<Tenant[]>("/tenants");
    return tenants;
  } catch (error) {
    console.error("Failed to fetch tenants:", error);
    return [];
  }
};
