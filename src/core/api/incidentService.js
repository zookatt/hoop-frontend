import { apiClient } from "./apiClient";

export async function getIncidents() {
  const response = await apiClient.get("/incidents");

  return response.data;
}
