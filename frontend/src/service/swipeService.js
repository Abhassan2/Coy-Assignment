import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL

export const saveSwipe = async (profileId, action) => {
  try {
    const response = await axios.post(`${baseURL}/swipes`, {
      profileId,
      action,
    });

    return response.data;
  } catch (error) {
    console.error("Save swipe error:", error);

    if (error.response) {
      throw new Error(
        error.response.data?.message || "Failed to save swipe"
      );
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(error.message || "Unexpected error occurred");
    }
  }
};

export const resetSwipes = async ()=>{
  try {
    const response = await axios.delete(`${baseURL}/swipes/reset`);

  } catch (error) {
    console.error("Reset swipe error:", error);

    if (error.response) {
      throw new Error(
        error.response.data?.message || "Failed to reset swipes"
      );
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(
        error.message || "Unexpected error occurred"
      );
    }
  }
}