import mongoose from "mongoose";

const syllabusSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  semester: String,
  academicYear: String,
  fileSize: Number,
  lastUpdated: { type: Date, default: Date.now },
  isOfficial: Boolean,
  type: { type: String, default: "syllabus" }
});

export default mongoose.model("Syllabus", syllabusSchema);
