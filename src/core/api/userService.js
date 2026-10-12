import { apiClient } from "./apiClient";

export async function getUsers() {
  const response = await apiClient.get("/users");
  return response.data;
}

export async function createUser({ name, email, password, roleId }) {
  const response = await apiClient.post("/users", {
    name,
    email,
    password,
    roleId,
  });

  return response.data;
}

export async function getUserRoles() {
  const response = await apiClient.get("/user-roles");
  return response.data;
}
