import express from "express";
import {getGeminiResponse} from './src/LLMProcessor.js'
import cors from "cors";
import { splitData } from "./src/embeddings/textSplitter.js";
import { searchText, storeEmbeddings } from "./src/vectorDB/pineconeProcessor.js";
import type { Request, Response } from "express";

 
const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.post("/api/gemini", async (req: any, res: any) => {
  try {
    const { humanMessage } = req.body;

    if (!humanMessage) {
      return res.status(400).json({ error: "humanMessage is required" });
    }

    const response = await mainProcessor(humanMessage);
    return res.status(200).json({ success: true, data: response }); // ✅ Correct
  } catch (error) {
    console.error("Error in /api/gemini:", error);

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
