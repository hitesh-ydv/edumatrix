import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    position: { type: String, required: true },
    company: { type: String, required: true },
    companyLogo: { type: String, default: "" },
    location: { type: String, default: "" },
    duration: { type: String, default: "" },
    stipend: { type: String, default: "" },   // e.g., "₹80,000/month"
    deadline: { type: String, default: "" },  // keep as string, or use Date type if you prefer
    status: { type: String, default: "Open" }, // "Open" | "Closing Soon" | "Closed"
    skills: { type: [String], default: [] },
    description: { type: String, default: "" },
    applicationTips: { type: [String], default: [] },
    applicationUrl: { type: String, default: "" },
    type: { type: String, default: "internship" }
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError
const Internship =
  mongoose.models.Internship || mongoose.model("Internship", internshipSchema);

export default Internship;
