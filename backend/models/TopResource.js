import mongoose from "mongoose";

const topResourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  type: { type: String, required: true },
  category: { type: String, required: true },
  rating: { type: Number, required: true },
  views: { type: String, required: true },
  duration: { type: String, required: true },
  tags: [{ type: String }],
  route: { type: String, required: true },
  featured: { type: Boolean, default: false },
  type: { type: String, default: "top-resource" }
}, { timestamps: true });

export default mongoose.model("TopResource", topResourceSchema);
