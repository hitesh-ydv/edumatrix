import TopResource from "../models/TopResource.js";

// CREATE - Add new resource
export const addTopResource = async (req, res) => {
  try {
    const newResource = new TopResource(req.body);
    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (err) {
    res.status(400).json({ error: err.message }); // 400 for client-side errors
  }
};

// READ - Get all resources
export const getTopResources = async (req, res) => {
  try {
    const resources = await TopResource.find();
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ - Get single resource by ID
export const getTopResourceById = async (req, res) => {
  try {
    const resource = await TopResource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(resource);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE - Update existing resource
export const updateTopResource = async (req, res) => {
  try {
    const updatedResource = await TopResource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, // Return the updated document
        runValidators: true // Run model validations on update
      }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json(updatedResource);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE - Remove resource
export const deleteTopResource = async (req, res) => {
  try {
    const deletedResource = await TopResource.findByIdAndDelete(req.params.id);
    if (!deletedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};