import { CohereEmbeddings } from "@langchain/cohere";
import "dotenv/config";

const embeddings = new CohereEmbeddings({
  apiKey: process.env.COHERE_API_KEY, // In Node.js defaults to process.env.COHERE_API_KEY
  batchSize: 48, // Default value if omitted is 48. Max value is 96
  model: "embed-english-v3.0",
});

export async function getEmbeddings(data:string[]){
    const embeddingRes = await Promise.all(
        data.map(async(item, index)=> await embeddings.embedQuery(item))
    )
    
    console.log("embedding",embeddingRes)
    return embeddingRes
}