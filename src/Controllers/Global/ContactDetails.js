import { ContactDetails } from "../../Models/Global/ContactDetails.js"; // Adjust path
import  uploadOnCloudinary  from "../../Utils/Clodinary.js"; 

/* ================= GET ================= */
export const getContactDetails = async (req, res) => {
  try {
    const data = await ContactDetails.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= CREATE ================= */
export const createContactDetails = async (req, res) => {
  try {
    const existing = await ContactDetails.findOne();
    if (existing) {
      return res.status(400).json({ success: false, message: "Section exists. Use Update." });
    }

    const bodyData = { ...req.body };

    // Validate Video
    if (req.files && req.files.RightsecVedio && req.files.RightsecVedio[0]) {
        const upload = await uploadOnCloudinary(req.files.RightsecVedio[0].path);
        if (upload) {
            bodyData.RightsecVedio = upload.secure_url;
        } else {
            return res.status(500).json({ message: "Video upload failed" });
        }
    } else {
        return res.status(400).json({ message: "Right section video is required" });
    }

    const newContact = new ContactDetails(bodyData);
    await newContact.save();

    return res.status(201).json({ success: true, message: "Created Successfully", data: newContact });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= UPDATE ================= */
export const updateContactDetails = async (req, res) => {
  try {
    const updates = { ...req.body };

    // Handle Video Update (Only if a new file is sent)
    if (req.files && req.files.RightsecVedio && req.files.RightsecVedio[0]) {
        const upload = await uploadOnCloudinary(req.files.RightsecVedio[0].path);
        if (upload) updates.RightsecVedio = upload.secure_url;
    }

    const updatedContact = await ContactDetails.findOneAndUpdate(
      {}, 
      { $set: updates },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json({ success: true, message: "Updated Successfully", data: updatedContact });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= DELETE ================= */
export const deleteContactDetails = async (req, res) => {
  try {
    await ContactDetails.findOneAndDelete({});
    return res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};