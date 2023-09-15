import { loadS3IntoPinecone } from "@/lib/pincone";
import { NextResponse } from "next/server";

export async function POST(req: Response, res: Response) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    // console.log(file_key, file_name);
    const pages = await loadS3IntoPinecone(file_key);
    return NextResponse.json({ pages });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
