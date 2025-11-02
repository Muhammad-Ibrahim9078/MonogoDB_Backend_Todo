// models/userModel.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  task: String
});

export const User = mongoose.model("User", userSchema);
