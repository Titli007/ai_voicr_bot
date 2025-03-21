import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs";

async function ReadJsonFile(): Promise<string> {
  try {
    const filePath = "../backend/src/dataStrore/MyData.json";
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const jsonString = fs.readFileSync(filePath, "utf-8");
    return jsonString;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw new Error("Failed to read JSON file.");
  }
}

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 0,
});

export async function splitData(): Promise<string[]> {
  try {
    const myDataObj = await ReadJsonFile();

    if (!myDataObj) {
      throw new Error("No data found in the JSON file.");
    }

    const texts = await textSplitter.splitText(myDataObj);
    return texts;
  } catch (error) {
    console.error("Error splitting data:", error);
    return []; 
  }
}
