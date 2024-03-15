import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const userPrompt = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    if (userPrompt.length === 0) {
      return new Response("No prompt found!", { status: 404 });
    }

    return new Response(JSON.stringify(userPrompt), { status: 200 });
  } catch {
    return new Response("Fail to get prompt!", { status: 500 });
  }
};
