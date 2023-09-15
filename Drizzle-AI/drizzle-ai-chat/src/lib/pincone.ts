import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { PineconeClient } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
let pinecone: PineconeClient | null = null;

export const getPineconeClient = async () => {
  if (!pinecone) {
    pinecone = new PineconeClient();
    await pinecone.init({
      environment: process.env.PINECONE_ENVIRONMENT!,
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }
  return pinecone;
};

export async function loadS3IntoPinecone(filekey: string) {
  console.log("downlading s3 into system");
  const file_name = await downloadFromS3(filekey);
  console.log("filename pinecone:", file_name);
  if (!file_name) {
    throw new Error("Error Parsing File");
  }
  const loader = new PDFLoader(file_name);
  const pages = await loader.load();
  return pages;
}
