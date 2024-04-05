import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findOne({ _id: params.id });

    if (Object.keys(prompt).length === 0) {
      return new Response("Fail to get prompt!", { status: 500 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch {
    return new Response("Fail to get prompt!", { status: 500 });
  }
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const curPrompt = await Prompt.findOne({ _id: params.id }).populate(
      "creator"
    );

    if (Object.keys(curPrompt).length === 0) {
      return new Response("Prompt not found!", { status: 404 });
    }

    curPrompt.prompt = prompt;
    curPrompt.tag = tag;
    curPrompt.date = new Date();
    await curPrompt.save();

    return new Response(JSON.stringify(curPrompt), { status: 200 });
  } catch {
    return new Response("Fail to update prompt!", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();
    await Prompt.findOneAndDelete({ _id: params.id });

    return new Response("Prompt deleted!", { status: 200 });
  } catch {
    return new Response("Fail to delete prompt!", { status: 500 });
  }
};
