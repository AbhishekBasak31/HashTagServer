import GallerySec from "../../Models/Global/GallerySec.js"; // Adjust path if needed

/* ================= GET (Singleton) ================= */
export const getGallerySec = async (req, res) => {
  try {
    // Find the first document. If none, return empty object or null
    const data = await GallerySec.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE (Only if empty) ================= */
export const createGallerySec = async (req, res) => {
  try {
    // Check if one already exists
    const existing = await GallerySec.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section already exists. Use Update." });
    }

    const { tag, Htext, SDesc } = req.body;
    if (!tag || !Htext || !SDesc) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newSec = new GallerySec({ tag, Htext, SDesc });
    await newSec.save();

    return res.status(201).json({ success: true, message: "Section created", data: newSec });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE (Singleton - No ID) ================= */
export const updateGallerySec = async (req, res) => {
  try {
    // Updates the first found document. 
    // 'upsert: true' creates it if it doesn't exist (optional, but robust)
    const updatedSec = await GallerySec.findOneAndUpdate(
      {}, // Filter: match any (first one)
      { $set: req.body },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ success: true, message: "Section updated", data: updatedSec });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE (Singleton - No ID) ================= */
export const deleteGallerySec = async (req, res) => {
  try {
    // Delete the first document found
    const deleted = await GallerySec.findOneAndDelete({});
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Nothing to delete" });
    }

    return res.status(200).json({ success: true, message: "Section deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};