import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    examType: { type: String, default: "" },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], default: "Medium" },
    description: { type: String, default: "" },
    duration: { type: String, default: "" },
    fee: { type: String, default: "" },
    nextExamDate: { type: String, default: "" },
    isPopular: { type: Boolean, default: false },
    preparationTips: { type: [String], default: [] },
    syllabusUrl: { type: String, default: "" },
    type: { type: String, default: "exam" }
  },
  { timestamps: true }
);

const Exam = mongoose.models.Exam || mongoose.model("Exam", examSchema);

export default Exam;
