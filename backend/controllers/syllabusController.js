import Syllabus from "../models/Syllabus.js";

// GET all syllabus - READ
export const getSyllabus = async (req, res) => {
  try {
    const syllabusList = await Syllabus.find();
    res.json(syllabusList);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET syllabus by ID - READ
export const getSyllabusById = async (req, res) => {
  try {
    const syllabus = await Syllabus.findById(req.params.id);
    if (!syllabus) {
      return res.status(404).json({ message: "Syllabus not found" });
    }
    res.json(syllabus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new syllabus - CREATE
export const addSyllabus = async (req, res) => {
  try {
    const newSyllabus = new Syllabus(req.body);
    const savedSyllabus = await newSyllabus.save();
    res.status(201).json(savedSyllabus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update syllabus - UPDATE
export const updateSyllabus = async (req, res) => {
  try {
    const updatedSyllabus = await Syllabus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSyllabus) {
      return res.status(404).json({ message: "Syllabus not found" });
    }
    res.json(updatedSyllabus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE syllabus - DELETE
export const deleteSyllabus = async (req, res) => {
  try {
    const deletedSyllabus = await Syllabus.findByIdAndDelete(req.params.id);
    
    if (!deletedSyllabus) {
      return res.status(404).json({ message: "Syllabus not found" });
    }
    res.json({ message: "Syllabus deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};