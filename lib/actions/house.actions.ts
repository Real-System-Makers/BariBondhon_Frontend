"use server";

import { revalidatePath } from "next/cache";
import { House, UpdateHouseDto } from "../types/house";
import { ApiClient } from "../utils/api-client";

export async function getHouseAction(): Promise<House | null> {
  try {
    return await ApiClient.get<House>("/houses");
  } catch (error) {
    console.error("Failed to fetch house:", error);
    return null;
  }
}

export async function updateHouseAction(data: UpdateHouseDto): Promise<House> {
  try {
    const house = await ApiClient.patch<House>("/houses", data);
    revalidatePath("/owner-home");
    return house;
  } catch (error) {
    console.error("Failed to update house:", error);
    throw error;
  }
}
