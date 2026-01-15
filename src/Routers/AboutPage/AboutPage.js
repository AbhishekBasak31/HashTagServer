import express from "express";
import {
  createAboutPage,
  getAboutPage,
  updateAboutPage,
  deleteAboutPage,
} from "../../Controllers/AboutPage/AboutPage.js";
import { upload } from "../../Middleware/Multer.js";

const AboutPageRouter = express.Router();

// Define all potential Image Fields for Multer
const imageFields = upload.fields([
  { name: "BannerImg", maxCount: 1 },
  { name: "CardImg", maxCount: 1 },
  { name: "CardbottomIcon", maxCount: 1 },
  { name: "Multicard1icon", maxCount: 1 },
  { name: "Multicard2icon", maxCount: 1 },
  { name: "Multicard3icon", maxCount: 1 },
  { name: "teamimg1", maxCount: 1 },
  { name: "teamimg2", maxCount: 1 },
  { name: "teamimg3", maxCount: 1 },
  { name: "teamimg4", maxCount: 1 },
  { name: "teamimg5", maxCount: 1 },
  { name: "teamimg6", maxCount: 1 },
  { name: "teamimg7", maxCount: 1 },
  { name: "teamimg8", maxCount: 1 },
  { name: "teamimg9", maxCount: 1 },
]);

AboutPageRouter.get("/", getAboutPage);
// Auth middleware removed for dev testing as requested previously
AboutPageRouter.post("/", imageFields, createAboutPage);
AboutPageRouter.patch("/", imageFields, updateAboutPage);
AboutPageRouter.delete("/", deleteAboutPage);

export default AboutPageRouter;