import mongoose from "mongoose";

const RefreshTokenModelSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  refreshToken: String,
});

export default mongoose.model("refreshToken", RefreshTokenModelSchema);
