import axios from "axios";
import { API_BASE_URL } from "./apiClient";
import { saveAuthSession } from "../auth/authStorage";

export const PASSWORD_CHANGE_REQUIRED = "PASSWORD_CHANGE_REQUIRED";

export async function loginUser({ email, password }) {
  try {
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
  } catch (error) {
    if (error.response?.status === 409) {
      const passwordChangeError = new Error("Password change required");
      passwordChangeError.code = PASSWORD_CHANGE_REQUIRED;
      throw passwordChangeError;
    }

    throw error;
  }
}

export async function changeInitialPassword({
  email,
  currentPassword,
  newPassword,
}) {
  await axios.post(`${API_BASE_URL}/auth/change-password`, {
    email,
    currentPassword,
    newPassword,
  });
}
