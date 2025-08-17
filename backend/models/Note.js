import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subject: { type: String, required: true },
    semester: { type: String, required: true }, // kept as string
    fileType: {
      type: String,
      enum: ["PDF", "DOC", "PPT", "TXT", "OTHER"],
      default: "PDF"
    },
    fileSize: { type: Number, default: 0 }, // in bytes
    uploadDate: { type: Date, default: Date.now },
    description: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    fileUrl: { type: String, default: "" },
    type: { type: String, default: "note" }
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError (important in dev/hot reload)
const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);

export default Note;
