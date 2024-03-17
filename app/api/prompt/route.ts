import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const searchValue = req.nextUrl.searchParams.get("search");

    await connectToDB();
    let prompts;

    if (!searchValue) {
      prompts = await Prompt.find({}).populate("creator");
    } else {
      prompts = await Prompt.find({ $text: { $search: searchValue } }).populate(
        "creator"
      );
    }

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch {
    return new Response("Fail to get prompt!", { status: 500 });
  }
};
