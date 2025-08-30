import type { ApiInfo } from "./character";
export interface LocationFilters {
  page?: number;
  name?: string;
  type?: string;
  dimension?: string;
}

export interface LocationResponse {
  info: ApiInfo;
  results: Location[];
}
export type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[]; 
  url: string;
  created: string;
};