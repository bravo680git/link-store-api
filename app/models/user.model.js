import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, minlength: 8 },
  password: { type: String, minlength: 8 },
  role: { type: String, default: "user" },
});

export default mongoose.model("user", UserSchema);
