import mongoose from "mongoose";
import { HomeBanner } from "../../Models/HomePage/Banner.js"; // Adjust path as needed
import  uploadOnCloudinary  from "../../Utils/Clodinary.js"; // Adjust path as needed

const norm = (v) => (typeof v === "string" ? v.trim() : v);

/**
 * HELPER: Upload file to Cloudinary
 * Returns URL if successful, null if no file provided
 */
const uploadFile = async (files, key) => {
  if (files && files[key] && files[key][0]) {
    const upload = await uploadOnCloudinary(files[key][0].path);
    return upload?.secure_url || upload?.url;
  }
  return null;
};

/**
 * CREATE HOME BANNER
 * Requires all 3 videos and all text fields.
 */
export const createHomeBanner = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const existing = await HomeBanner.findOne().session(session);
    if (existing) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: "Banner config exists. Use Update." });
    }

    const files = req.files || {};
    const body = req.body;

    // 1. Define Fields
    const textFieldKeys = [
      "Tag1", "Htext1", "Dtext1",
      "Tag2", "Htext2", "Dtext2",
      "Tag3", "Htext3", "Dtext3"
    ];
    const videoFieldKeys = ["Video1", "Video2", "Video3"];

    // 2. Validate Text
    const missing = textFieldKeys.filter((field) => !norm(body[field]));

    // 3. Validate Videos (All 3 required on Create)
    videoFieldKeys.forEach((vid) => {
      if (!files[vid]) missing.push(vid);
    });

    if (missing.length > 0) {
      await session.abortTransaction();
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missing.join(", ")}`,
      });
    }

    // 4. Upload Videos
    const uploads = {};
    for (const vidKey of videoFieldKeys) {
      const url = await uploadFile(files, vidKey);
      if (!url) {
        await session.abortTransaction();
        return res.status(500).json({ success: false, message: `Failed to upload ${vidKey}` });
      }
      uploads[vidKey] = url;
    }

    // 5. Create Document
    const banner = new HomeBanner({
      ...uploads,
      Tag1: norm(body.Tag1),
      Htext1: norm(body.Htext1),
      Dtext1: norm(body.Dtext1),
      Tag2: norm(body.Tag2),
      Htext2: norm(body.Htext2),
      Dtext2: norm(body.Dtext2),
      Tag3: norm(body.Tag3),
      Htext3: norm(body.Htext3),
      Dtext3: norm(body.Dtext3),
    });

    await banner.save({ session });
    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      message: "HomeBanner created successfully.",
      data: banner,
    });
  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    console.error("createHomeBanner error:", err);
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  } finally {
    session.endSession();
  }
};

/**
 * GET HOME BANNER
 */
export const getHomeBanner = async (req, res) => {
  try {
    const data = await HomeBanner.findOne();
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * UPDATE HOME BANNER
 * Only updates fields present in the request.
 * Videos are only re-uploaded if a new file is provided.
 */
export const updateHomeBanner = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Singleton: Find the one document
    const latest = await HomeBanner.findOne().session(session);
    if (!latest) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: "No HomeBanner found to update." });
    }

    const updates = {};
    const body = req.body;
    const files = req.files || {};

    // 1. Update Texts (Only if provided in body)
    const textFieldKeys = [
      "Tag1", "Htext1", "Dtext1",
      "Tag2", "Htext2", "Dtext2",
      "Tag3", "Htext3", "Dtext3"
    ];

    textFieldKeys.forEach((field) => {
      if (body[field] !== undefined) updates[field] = norm(body[field]);
    });

    // 2. Update Videos (Only if a new file is uploaded)
    const videoFieldKeys = ["Video1", "Video2", "Video3"];
    
    for (const field of videoFieldKeys) {
      // uploadFile returns null if no file is present, so updates[field] won't be set
      const url = await uploadFile(files, field);
      if (url) {
        updates[field] = url;
      }
    }

    const updated = await HomeBanner.findByIdAndUpdate(latest._id, updates, {
      new: true,
      runValidators: true,
      session,
    });

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "HomeBanner updated successfully.",
      data: updated,
    });
  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    console.error("updateHomeBanner error:", err);
    return res.status(500).json({ success: false, message: "Internal server error", error: err.message });
  } finally {
    session.endSession();
  }
};

/**
 * DELETE HOME BANNER
 */
export const deleteHomeBanner = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const latest = await HomeBanner.findOne().session(session);
    
    if (!latest) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: "No HomeBanner found to delete." });
    }

    await HomeBanner.findByIdAndDelete(latest._id, { session });
    await session.commitTransaction();
    
    return res.status(200).json({ success: true, message: "HomeBanner deleted successfully." });
  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};