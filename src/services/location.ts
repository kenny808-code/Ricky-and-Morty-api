import type { Location, LocationResponse,LocationFilters } from "@/types/location";
import { api } from "./api";

export async function getLocations(filters: LocationFilters = {}): Promise<LocationResponse> {
  const response = await api.get<LocationResponse>("/location", {
    params: filters,
  });
  return response.data;
}

export async function getLocationById(id: number): Promise<Location>{
  const response = await api.get<Location>(`/location/${id}`);
  return response.data;
}