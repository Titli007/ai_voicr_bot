import axios from "axios";

export const getAiResponse = async (humanMessage: string) => {
  try {
    const response = await axios.post(`http://localhost:5000/api/gemini`, {
      humanMessage, // Wrap inside an object
    });

    console.log(response.data.data);
    return response.data.data; // Return the response
  } catch (error) {
    console.error("Error fetching AI response:", error);
    throw error; // Propagate the error
  }
};
