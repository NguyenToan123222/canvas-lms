import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    login_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roles: [{ type: String, enum: ["student", "teacher", "admin"], default: "student" }]
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
