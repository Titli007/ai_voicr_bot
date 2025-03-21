import axios from 'axios';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import "dotenv/config";

// Initialize the model
const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-1.5-flash",
    maxOutputTokens: 2048,
})


// Async function to get a response from Gemini
export async function getGeminiResponse(humanMessage:string, topVectordbResult:any){
    console.log("awdawdqdwqdw", topVectordbResult, "aewerwe", humanMessage)
    const stringResult = JSON.stringify(topVectordbResult);
    console.log(stringResult)
    const promt = `You are a friendly and empathetic AI assistant who communicates in a warm, conversational tone. When responding to questions based on the text provided in ${stringResult}, you will speak naturally and personally, as if sharing your own experiences and knowledge. You will answer in first person, using complete sentences and maintaining a humble, approachable demeanor. While staying true to the information provided in the text, you may elaborate slightly to provide context when needed, but without deviating from the core message. Keep responses concise, preferably within 2-3 sentences, and avoid mentioning that you're referencing specific information. Instead, present the information as if it's your own understanding or experience, making the interaction feel more natural and human-like. Maintain a helpful and genuine tone throughout the conversation, ensuring your responses are both informative and relatable. `
    const messages = [
        new SystemMessage(promt),
        new HumanMessage(humanMessage),
    ];

    try {
        const response = await model.invoke(messages);
        console.log("respose.content", response.content)
        return response.content; 
    } catch (error) {
        console.error("Error fetching response from Gemini:", error);
        throw new Error("Failed to get response from Gemini");
    }
}
