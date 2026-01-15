import { FeatureSec } from "../../Models/HomePage/Features.js"; // Adjust path
import  uploadOnCloudinary  from "../../Utils/Clodinary.js"; 

/* ================= GET ================= */
export const getFeatureSec = async (req, res) => {
  try {
    const data = await FeatureSec.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createFeatureSec = async (req, res) => {
  try {
    const existing = await FeatureSec.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section already exists. Use Update." });
    }

    const bodyData = { ...req.body };

    // Process Images Loop (card1Img to card6Img)
    for (let i = 1; i <= 6; i++) {
        const fieldName = `card${i}Img`;
        if (req.files && req.files[fieldName] && req.files[fieldName][0]) {
            const upload = await uploadOnCloudinary(req.files[fieldName][0].path);
            if (upload) bodyData[fieldName] = upload.secure_url;
        } else {
            return res.status(400).json({ message: `Image for Card ${i} is required.` });
        }
    }

    const newSec = new FeatureSec(bodyData);
    await newSec.save();

    return res.status(201).json({ success: true, message: "Feature Section Created", data: newSec });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateFeatureSec = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Process Images Loop (card1Img to card6Img)
    for (let i = 1; i <= 6; i++) {
        const fieldName = `card${i}Img`;
        if (req.files && req.files[fieldName] && req.files[fieldName][0]) {
            const upload = await uploadOnCloudinary(req.files[fieldName][0].path);
            if (upload) updates[fieldName] = upload.secure_url;
        }
    }

    const updatedSec = await FeatureSec.findOneAndUpdate(
      {}, 
      { $set: updates },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ success: true, message: "Feature Section Updated", data: updatedSec });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
/* ================= DELETE ================= */
export const deleteFeatureSec = async (req, res) => {
  try {
    await FeatureSec.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Feature Section Deleted" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};