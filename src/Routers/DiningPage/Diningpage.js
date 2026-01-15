import express from "express";
import { 
    createDiningPage, getDiningPage, updateDiningPage,
    addMenuItem, updateMenuItem, deleteMenuItem 
} from "../../Controllers/DiningPage/Diningpage.js";
import { upload } from "../../Middleware/Multer.js";

const DiningRouter = express.Router();

// Main Page Upload Config
const pageUpload = upload.fields([{ name: "diningIcon", maxCount: 1 }]);

// Menu Item Upload Config (img1 to img10)
const menuFields = Array.from({ length: 10 }, (_, i) => ({ name: `img${i + 1}`, maxCount: 1 }));
const menuUpload = upload.fields(menuFields);

// --- Routes ---

// Main Page
DiningRouter.get("/", getDiningPage);
DiningRouter.post("/", pageUpload, createDiningPage);
DiningRouter.patch("/", pageUpload, updateDiningPage);

// Menu Items
DiningRouter.post("/menu", menuUpload, addMenuItem);
DiningRouter.patch("/menu/:id", menuUpload, updateMenuItem);
DiningRouter.delete("/menu/:id", deleteMenuItem);

export default DiningRouter;