import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs";

async function ReadJsonFile() {
    try {
        const jsonString = fs.readFileSync("../backend/src/dataStrore/MyData.json", "utf-8");
        // console.log(jsonString)
        return jsonString
      } catch (error) {
        console.error("Error reading JSON file:", error);
      }
}

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,
  chunkOverlap: 0,
});

export async function splitData(){
    const myDataObj = await ReadJsonFile()
    const texts = await textSplitter.splitText(myDataObj);
    // console.log(texts)
    return texts
}