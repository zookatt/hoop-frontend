import { apiClient } from "./apiClient";

export async function getIncidents() {
  const response = await apiClient.get("/incidents");

  return response.data;
}

export async function getIncidentById(id) {
  const response = await apiClient.get(`/incidents/${id}`);

  return response.data;
}

export async function createIncident(payload) {
  const response = await apiClient.post("/incidents", payload);

  return response.data;
}

export async function updateIncident(id, payload) {
  const response = await apiClient.put(`/incidents/${id}`, payload);

  return response.data;
}

export async function assignIncident(id, payload) {
  const response = await apiClient.put(`/incidents/${id}/assignment`, payload);

  return response.data;
}

export async function updateIncidentStatus(id, status) {
  const response = await apiClient.put(`/incidents/${id}/status`, {
    status,
  });

  return response.data;
}
