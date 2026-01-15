import express from "express";
import {
  createHomeAbout,
  getAllHomeAbout,
  updateHomeAbout,
  deleteHomeAbout,
} from "../../Controllers/Homepage/About.js";
import { authenticate } from "../../Middleware/AuthMiddlewares.js"; // Ensure this path is correct
import { upload } from "../../Middleware/Multer.js";

const HomeAboutRouter = express.Router();

// Define all 12 Image Fields for Multer
const imageFields = upload.fields([
  { name: "centerLogo", maxCount: 1 },
  { name: "tab1Icon", maxCount: 1 },
  { name: "tab2Icon", maxCount: 1 },
  { name: "tab3Icon", maxCount: 1 },
  { name: "outerorbitImg1", maxCount: 1 },
  { name: "outerorbitImg2", maxCount: 1 },
  { name: "outerorbitImg3", maxCount: 1 },
  { name: "outerorbitImg4", maxCount: 1 },
  { name: "innerorbitImg1", maxCount: 1 },
  { name: "innerorbitImg2", maxCount: 1 },
  { name: "innerorbitImg3", maxCount: 1 },
  { name: "innerorbitImg4", maxCount: 1 },
]);

HomeAboutRouter.get("/", getAllHomeAbout);
HomeAboutRouter.post("/", authenticate, imageFields, createHomeAbout);
HomeAboutRouter.patch("/", authenticate, imageFields, updateHomeAbout);
HomeAboutRouter.patch("/:id", authenticate, imageFields, updateHomeAbout);
HomeAboutRouter.delete("/", authenticate, deleteHomeAbout);
HomeAboutRouter.delete("/:id", authenticate, deleteHomeAbout);

export default HomeAboutRouter;