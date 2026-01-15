import mongoose from "mongoose";
import { AboutPage } from "../../Models/AboutPage/AboutPage.js"; // Adjust path as needed
import uploadOnCloudinary  from "../../Utils/Clodinary.js"; 

const norm = (v) => (typeof v === "string" ? v.trim() : v);

/**
 * HELPER: Upload file if exists
 */
const uploadFile = async (files, key) => {
  if (files && files[key] && files[key][0]) {
    const upload = await uploadOnCloudinary(files[key][0].path);
    return upload?.secure_url || upload?.url;
  }
  return null;
};

/**
 * CREATE AboutPage
 */
export const createAboutPage = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const existing = await AboutPage.findOne().session(session);
    if (existing) {
        await session.abortTransaction();
        return res.status(400).json({ success: false, message: "AboutPage already exists. Use update." });
    }

    const files = req.files || {};
    const body = req.body;

    // 1. Define Text Fields
    const textFields = [
      "BannerTag", "BannerHtext",
      "CardHtext", "CardDtext", "CardbottomHtext", "CardbottomDtext",
      "Counter1", "CounterText1", "Counter2", "CounterText2",
      "Counter3", "CounterText3", "Counter4", "CounterText4",
      "Multicardtag", "MulticardHtext",
      "Multicard1htext", "Multicard1dtext",
      "Multicard2htext", "Multicard2dtext",
      "Multicard3htext", "Multicard3dtext",
      "teamHtext", "teamDtext",
      "teamdesig1", "teamdename1", "teamdesig2", "teamdename2", "teamdesig3", "teamdename3",
      "teamdesig4", "teamdename4", "teamdesig5", "teamdename5", "teamdesig6", "teamdename6",
      "teamdesig7", "teamdename7", "teamdesig8", "teamdename8", "teamdesig9", "teamdename9",
      "ctatext", "buttonUrl"
    ];

    // 2. Define Image Fields
    const imageFields = [
      "BannerImg", "CardImg", "CardbottomIcon",
      "Multicard1icon", "Multicard2icon", "Multicard3icon",
      "teamimg1", "teamimg2", "teamimg3",
      "teamimg4", "teamimg5", "teamimg6",
      "teamimg7", "teamimg8", "teamimg9"
    ];

    // 3. Validation (Check required fields)
    const requiredFields = ["BannerTag", "BannerHtext", "CardHtext", "CardDtext"]; // Add more as needed
    const missing = requiredFields.filter(f => !norm(body[f]));
    
    if (missing.length > 0) {
      await session.abortTransaction();
      return res.status(400).json({ success: false, message: `Missing required fields: ${missing.join(", ")}` });
    }

    // 4. Upload Images
    const uploads = {};
    for (const imgKey of imageFields) {
      const url = await uploadFile(files, imgKey);
      if (url) uploads[imgKey] = url;
    }

    // 5. Build Document
    const docData = { ...uploads };
    textFields.forEach(f => { 
        if(body[f] !== undefined) docData[f] = norm(body[f]); 
    });

    const newDoc = new AboutPage(docData);
    await newDoc.save({ session });
    await session.commitTransaction();

    return res.status(201).json({ success: true, message: "AboutPage created", data: newDoc });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};

/**
 * GET ALL
 */
export const getAboutPage = async (req, res) => {
  try {
    const data = await AboutPage.findOne(); // Singleton
    return res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * UPDATE AboutPage
 */
export const updateAboutPage = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const target = await AboutPage.findOne().session(session);

    if (!target) {
      await session.abortTransaction();
      return res.status(404).json({ success: false, message: "No document found" });
    }

    const updates = {};
    const body = req.body || {};
    const files = req.files || {};

    // 1. Text Fields Update
    const textFields = [
      "BannerTag", "BannerHtext",
      "CardHtext", "CardDtext", "CardbottomHtext", "CardbottomDtext",
      "Counter1", "CounterText1", "Counter2", "CounterText2",
      "Counter3", "CounterText3", "Counter4", "CounterText4",
      "Multicardtag", "MulticardHtext",
      "Multicard1htext", "Multicard1dtext",
      "Multicard2htext", "Multicard2dtext",
      "Multicard3htext", "Multicard3dtext",
      "teamHtext", "teamDtext",
      "teamdesig1", "teamdename1", "teamdesig2", "teamdename2", "teamdesig3", "teamdename3",
      "teamdesig4", "teamdename4", "teamdesig5", "teamdename5", "teamdesig6", "teamdename6",
      "teamdesig7", "teamdename7", "teamdesig8", "teamdename8", "teamdesig9", "teamdename9",
      "ctatext", "buttonUrl"
    ];

    textFields.forEach(field => {
        if (body[field] !== undefined) {
            updates[field] = norm(body[field]);
        }
    });

    // 2. Image Fields Update
    const imageFields = [
      "BannerImg", "CardImg", "CardbottomIcon",
      "Multicard1icon", "Multicard2icon", "Multicard3icon",
      "teamimg1", "teamimg2", "teamimg3",
      "teamimg4", "teamimg5", "teamimg6",
      "teamimg7", "teamimg8", "teamimg9"
    ];

    for (const field of imageFields) {
        const url = await uploadFile(files, field);
        if (url) updates[field] = url;
    }

    if (Object.keys(updates).length === 0) {
       await session.abortTransaction();
       return res.status(400).json({ success: false, message: "No changes provided" });
    }

    const updatedDoc = await AboutPage.findByIdAndUpdate(target._id, { $set: updates }, { new: true, session });

    await session.commitTransaction();
    return res.status(200).json({ success: true, message: "Updated successfully", data: updatedDoc });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json({ success: false, message: err.message });
  } finally {
    session.endSession();
  }
};

/**
 * DELETE
 */
export const deleteAboutPage = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const target = await AboutPage.findOne().session(session);
        
        if(!target) {
            await session.abortTransaction();
            return res.status(404).json({success:false, message: "Not found"});
        }
        await AboutPage.findByIdAndDelete(target._id, {session});
        await session.commitTransaction();
        return res.status(200).json({success:true, message:"Deleted"});
    } catch(err){
        if(session.inTransaction()) await session.abortTransaction();
        return res.status(500).json({success:false, message: err.message});
    } finally {
        session.endSession();
    }
};