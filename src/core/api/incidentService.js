import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const INCIDENTS_API_URL = `${API_BASE_URL}/incidents`;

export async function getIncidents(apiUrl = INCIDENTS_API_URL) {
  if (!apiUrl) {
    throw new Error("Incidents API URL is missing");
  }

  const response = await axios.get(apiUrl);

  return response.data;
}
