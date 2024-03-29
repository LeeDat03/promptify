import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
    unique: [true, "Email already exist!"],
  },
  image: String,
});

// if not exist, create a new model
const User = models.User || mongoose.model("User", userSchema);

export default User;
