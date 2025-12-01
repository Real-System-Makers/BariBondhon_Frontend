"use server";

import { ApiClient } from "../utils/api-client";
import { PublicStats } from "../types/stats";

export async function getPublicStatsAction(): Promise<PublicStats | null> {
  try {
    return await ApiClient.get<PublicStats>("/stats/public", {
      skipAuth: true,
    });
  } catch (error) {
    console.error("Failed to fetch public statistics:", error);
    return null;
  }
}

