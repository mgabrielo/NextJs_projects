import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {
  PineconeClient,
  Vector,
  utils as PineConeUtils,
} from "@pinecone-database/pinecone";
import md5 from "md5";
import { downloadFromS3 } from "./s3-server";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbedding } from "./embedding";
import { convertToAscii } from "./utils";

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
type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};
export async function loadS3IntoPinecone(filekey: string) {
  console.log("downlading s3 into system");
  const file_name = await downloadFromS3(filekey);
  console.log("filename pinecone:", file_name);
  if (!file_name) {
    throw new Error("Error Parsing File");
  }
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];
  // return pages;
  const documents = await Promise.all(pages.map(prepareDocument));

  const vectors = await Promise.all(
    documents.flat().map((document) => embedDocument(document))
  );

  const client = await getPineconeClient();

  const pinconeIndex = client.Index("drizzle");

  console.log("inserting Vectors...");

  const nameSpace = convertToAscii(filekey);

  PineConeUtils.chunkedUpsert(pinconeIndex, vectors, nameSpace, 10);

  return documents[0];
}

async function embedDocument(doc: Document) {
  try {
    const embedding = await getEmbedding(doc.pageContent);
    const hash = md5(doc.pageContent);
    return {
      id: hash,
      values: embedding,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as Vector;
  } catch (error) {
    console.log("error embedding docs", error);
    throw error;
  }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
