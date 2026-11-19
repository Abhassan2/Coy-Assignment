import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const getFeed = async () => {
  try {
    const response = await axios.get(`${baseURL}/feed`);
    return response.data;
    
  } catch (error) {
    console.error("Get feed error:", error);

    if (error.response) {
      throw new Error(
        error.response.data?.error ||
        error.response.data?.message ||
        "Failed to fetch feed"
      );
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};
