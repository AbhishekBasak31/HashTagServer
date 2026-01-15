import mongoose from "mongoose";
import { DiningPage } from "../../Models/DiningPage/DiningPage.js"; // Adjust path
import  uploadOnCloudinary  from "../../Utils/Clodinary.js";

const norm = (v) => (typeof v === "string" ? v.trim() : v);

/* ================= MAIN PAGE OPERATIONS ================= */

// Create or Initialize Page (Singleton)
export const createDiningPage = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const existing = await DiningPage.findOne().session(session);
    if (existing) {
        await session.abortTransaction();
        return res.status(400).json({ success: false, message: "Page already exists. Use update." });
    }

    const { tag, Htext, Dtext } = req.body;
    const iconFile = req.files?.diningIcon?.[0];

    if (!tag || !Htext || !Dtext || !iconFile) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Tag, Heading, Description and Icon are required." });
    }

    const upload = await uploadOnCloudinary(iconFile.path);
    
    const newPage = new DiningPage({
        tag: norm(tag),
        Htext: norm(Htext),
        Dtext: norm(Dtext),
        diningIcon: upload.secure_url || upload.url,
        Menu: []
    });

    await newPage.save({ session });
    await session.commitTransaction();
    return res.status(201).json({ success: true, data: newPage });

  } catch (err) {
    if (session.inTransaction()) await session.abortTransaction();
    return res.status(500).json({ message: err.message });
  } finally {
    session.endSession();
  }
};

// Get Page Data
export const getDiningPage = async (req, res) => {
  try {
    const data = await DiningPage.findOne();
    // Return as array for consistency with other list views if needed, or object
    return res.status(200).json({ success: true, data: data ? [data] : [] });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Update Main Page Details
export const updateDiningPage = async (req, res) => {
  try {
    const page = await DiningPage.findOne();
    if (!page) return res.status(404).json({ message: "Page not found" });

    const updates = {};
    if (req.body.tag) updates.tag = norm(req.body.tag);
    if (req.body.Htext) updates.Htext = norm(req.body.Htext);
    if (req.body.Dtext) updates.Dtext = norm(req.body.Dtext);

    if (req.files?.diningIcon?.[0]) {
        const upload = await uploadOnCloudinary(req.files.diningIcon[0].path);
        updates.diningIcon = upload.secure_url;
    }

    const updated = await DiningPage.findByIdAndUpdate(page._id, updates, { new: true });
    return res.status(200).json({ success: true, data: updated });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

/* ================= MENU ITEM OPERATIONS ================= */

// Add Menu Item
export const addMenuItem = async (req, res) => {
    try {
        const page = await DiningPage.findOne();
        if (!page) return res.status(404).json({ message: "Create main page first" });

        const { title, category, desc } = req.body;
        const files = req.files || {};

        // Validation: Required images img1, img2, img3
        if (!files.img1 || !files.img2 || !files.img3) {
            return res.status(400).json({ message: "Images 1, 2, and 3 are required." });
        }

        // Upload loop for img1 to img10
        const imgUrls = {};
        for (let i = 1; i <= 10; i++) {
            const key = `img${i}`;
            if (files[key]?.[0]) {
                const up = await uploadOnCloudinary(files[key][0].path);
                imgUrls[key] = up.secure_url;
            }
        }

        const newItem = {
            title: norm(title),
            category: norm(category),
            desc: norm(desc),
            ...imgUrls
        };

        page.Menu.push(newItem);
        await page.save();

        // Return the newly created item (it will be the last one)
        return res.status(201).json({ success: true, data: page.Menu[page.Menu.length - 1] });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

// Update Menu Item
export const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params; // Menu item ID
        const page = await DiningPage.findOne({ "Menu._id": id });
        
        if (!page) return res.status(404).json({ message: "Menu item not found" });

        const item = page.Menu.id(id);
        if (!item) return res.status(404).json({ message: "Item not found" });

        // Update Text
        if (req.body.title) item.title = norm(req.body.title);
        if (req.body.category) item.category = norm(req.body.category);
        if (req.body.desc) item.desc = norm(req.body.desc);

        // Update Images (only if new file provided)
        const files = req.files || {};
        for (let i = 1; i <= 10; i++) {
            const key = `img${i}`;
            if (files[key]?.[0]) {
                const up = await uploadOnCloudinary(files[key][0].path);
                item[key] = up.secure_url;
            }
        }

        await page.save();
        return res.status(200).json({ success: true, data: item });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

// Delete Menu Item
export const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const page = await DiningPage.findOne({ "Menu._id": id });
        if (!page) return res.status(404).json({ message: "Not found" });

        page.Menu.pull({ _id: id });
        await page.save();

        return res.status(200).json({ success: true, message: "Item deleted" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};