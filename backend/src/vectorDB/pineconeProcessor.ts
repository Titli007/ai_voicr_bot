import { v4 as uuidv4 } from "uuid";
import { Pinecone } from "@pinecone-database/pinecone";
import "dotenv/config";

// Ensure all required environment variables exist
const API_KEY = process.env.PINECONE_API_KEY;
const INDEX_NAME = process.env.PINECONE_INDEX;
const HOST_NAME = process.env.PINECONE_HOST;

if (!API_KEY || !INDEX_NAME || !HOST_NAME) {
  throw new Error("Missing required environment variables: PINECONE_API_KEY, PINECONE_INDEX, or PINECONE_HOST");
}

const pc = new Pinecone({ apiKey: API_KEY });

const namespace = pc.index(INDEX_NAME, HOST_NAME).namespace("example-namespace");


async function createIndex(){
    const result = await pc.createIndexForModel({
        name: 'mynewdataindex',
        cloud: 'aws',
        region: 'us-east-1',
        embed: {
          model: 'multilingual-e5-large',
          fieldMap: { text: 'chunk_text' },
        },
        suppressConflicts: true,
        waitUntilReady: true,
      });

      console.log("uyasuhig",result)
}

export async function storeEmbeddings(data : string[]) {
    createIndex()

    const ids = data.map(() => uuidv4());
    const processeddata = data.map((item, index)=>({_id : ids[index], chunk_text: item}))
    console.log(processeddata)
    const result = await namespace.upsertRecords(processeddata)
    console.log(result)
    
}

export async function searchText(humanMessage:string){
    const response = await namespace.searchRecords({
        query: {
          topK: 10,
          inputs: { text: humanMessage },
        },
        fields: ['chunk_text'],
      });
      
      console.log("123423",JSON.stringify(response, null, 2));
      return response
}


