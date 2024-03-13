import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";

export const POST = async (req: Request) => {
  const { prompt, tag, userId } = await req.json();

  try {
    await connectToDB();
    const newPrompt = await Prompt.create({
      prompt,
      tag,
      creator: userId,
    });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    return new Response("Fail to create prompt!", { status: 500 });
  }
};
