import express from "express";
import { upload } from "../../Middleware/Multer.js"; 
import { 
  getHomeBanner, 
  createHomeBanner, 
  updateHomeBanner, 
  deleteHomeBanner 
} from "../../Controllers/Homepage/Banner.js";

const HomeBannerRouter = express.Router();

// Middleware to handle 3 video fields
const bannerUploads = upload.fields([
  { name: "Video1", maxCount: 1 },
  { name: "Video2", maxCount: 1 },
  { name: "Video3", maxCount: 1 },
]);

HomeBannerRouter.get("/", getHomeBanner);
HomeBannerRouter.post("/", bannerUploads, createHomeBanner);
HomeBannerRouter.patch("/", bannerUploads, updateHomeBanner); 
HomeBannerRouter.delete("/", deleteHomeBanner);

export default HomeBannerRouter;