import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const getMatches = async () => {
  try {
    const response = await axios.get(`${baseURL}/matches`);
    
    return response.data;

  } catch (error) {
    console.error("Get matches error:", error);

    throw new Error(
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch matches"
    );
  }
};
