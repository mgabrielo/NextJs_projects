import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPEN_AI_APIKEY,
});

const openai = new OpenAIApi(config);

export async function getEmbedding(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    const result = await response.json();
    console.log("result:", result);
    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("error calling openai embedding:", error);
  }
}
