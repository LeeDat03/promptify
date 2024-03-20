import mongoose from "mongoose";

const promptSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required!"],
    min: [20, "Prompt needs at least 20 characters"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required!"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Prompt = mongoose.models.Prompt || mongoose.model("Prompt", promptSchema);

promptSchema.index({ prompt: "text", tag: "text" });

export default Prompt;
