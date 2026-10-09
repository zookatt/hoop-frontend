import axios from "axios";
import { API_BASE_URL } from "./apiClient";
import { saveAuthSession } from "../auth/authStorage";

export async function loginUser({ email, password }) {
  const response = await axios.post(`${API_BASE_URL}/auth/token`, null, {
    auth: {
      username: email,
      password,
    },
  });

  const token = response.data;

  if (!token || typeof token !== "string") {
    throw new Error("Invalid token response");
  }

  const user = saveAuthSession(token);

  return {
    token,
    user,
  };
}
