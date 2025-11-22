"use server";

import { revalidatePath } from "next/cache";
import { CreateFlatDto, Flat } from "../types/flat";
import { ApiClient } from "../utils/api-client";

export async function getFlatsAction(): Promise<Flat[]> {
  try {
    return await ApiClient.get<Flat[]>("/flats");
  } catch (error) {
    console.error("Failed to fetch flats:", error);
    return [];
  }
}

export async function createFlatAction(data: CreateFlatDto): Promise<Flat> {
  try {
    const flat = await ApiClient.post<Flat>("/flats", data);
    revalidatePath("/flat-management");
    return flat;
  } catch (error) {
    console.error("Failed to create flat:", error);
    throw error;
  }
}

export async function deleteFlatAction(id: string): Promise<void> {
  try {
    await ApiClient.delete(`/flats/${id}`);
    revalidatePath("/flat-management");
  } catch (error) {
    console.error("Failed to delete flat:", error);
    throw error;
  }
}
