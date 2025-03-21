import { v4 as uuidv4 } from 'uuid';
import { Embeddings } from "@langchain/core/embeddings";
import { Pinecone } from '@pinecone-database/pinecone'
import "dotenv/config";

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY })
const namespace = pc.index(process.env.PINECONE_INDEX, process.env.PINECONE_HOST).namespace("example-namespace");

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


// {
//     name: 'mynewdataindex',
//     dimension: 1024,
//     metric: 'cosine',
//     host: 'mynewdataindex-9hy5zv6.svc.aped-4627-b74a.pinecone.io',
//     deletionProtection: 'disabled',
//     tags: undefined,
//     embed: {
//       model: 'multilingual-e5-large',
//       metric: 'cosine',
//       dimension: 1024,
//       vectorType: 'dense',
//       fieldMap: { text: 'chunk_text' },
//       readParameters: { input_type: 'query', truncate: 'END' },
//       writeParameters: { input_type: 'passage', truncate: 'END' }
//     },
//     spec: { pod: undefined, serverless: { cloud: 'aws', region: 'us-east-1' } },
//     status: { ready: true, state: 'Ready' },
//     vectorType: 'dense'
//   }