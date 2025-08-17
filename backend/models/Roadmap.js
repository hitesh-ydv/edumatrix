import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  thumbnail: { type: String, default: "" },
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
  duration: { type: String, default: "" }, // e.g., "12 weeks"
  enrolled: { type: String, default: "" }, // e.g., "2,847"
  rating: { type: Number, default: 0 },
  progress: { type: Number, default: 0 }, // optional on some items
  tags: { type: [String], default: [] },
  category: { type: String, enum: ["skill", "semester"], required: true },
  semester: { type: String, default: "" },

  // 👇 new field added
  type: { type: String, default: "roadmap" }
}, { timestamps: true });

export default mongoose.model("Roadmap", roadmapSchema);
