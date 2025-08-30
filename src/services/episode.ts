// src/services/episode.ts
import type { Episode, EpisodeFilters, EpisodeResponse } from "@/types/episode";
import { api } from "./api";

// Get paginated list of episodes with optional filters
export async function getEpisodes(filters: EpisodeFilters = {}): Promise<EpisodeResponse> {
  const response = await api.get<EpisodeResponse>("/episode", {
    params: filters,
  });
  return response.data;
}

// Get details of a single episode by ID
export async function getEpisodeById(id: number): Promise<Episode> {
  const response = await api.get<Episode>(`/episode/${id}`);
  return response.data;
}