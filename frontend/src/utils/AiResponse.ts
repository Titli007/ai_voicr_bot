import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const getAiResponse = async (humanMessage: string) => {
  try {
    const response = await axios.post(`${apiUrl}/api/gemini`, {
      humanMessage, // Wrap inside an object
    });

    console.log(response.data.data);
    return response.data.data; // Return the response
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error; // Propagate the error
  }
};
