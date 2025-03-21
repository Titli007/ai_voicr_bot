import express, { Request, Response } from "express";
import {getGeminiResponse} from './src/LLMProcessor.ts'
import cors from "cors";
import { splitData } from "./src/embeddings/textSplitter.js";
import { getEmbeddings } from "./src/embeddings/cohereProcessor.js";
import { searchText, storeEmbeddings, storeInVectorDb } from "./src/vectorDB/pineconeProcessor.js";
import { HumanMessage } from "@langchain/core/messages";
 
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.post("/api/gemini", async (req: Request, res: Response) => {
  try {
    const { humanMessage } = req.body;

    if (!humanMessage) {
      return res.status(400).json({ error: "humanMessage is required" });
    }

    const response = await mainProcessor(humanMessage);
    return res.status(200).json({ success: true, data: response });
  } catch (error) {
    console.error("Error in /api/gemini:", error);

    // Handle specific error cases
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
});

async function mainProcessor(humanMessage:string){
  const topVectordbResult = await searchText(humanMessage)
  const aiResponse = await getGeminiResponse(humanMessage, topVectordbResult)
  console.log("airesponse", aiResponse)
  return aiResponse
}

async function test(){
  console.log("calliong test")
  const splits = await splitData()
  const res2 = await storeEmbeddings(splits)
}

app.listen(PORT, () => {
  test()
  console.log(`Server running on port ${PORT}`);
});
