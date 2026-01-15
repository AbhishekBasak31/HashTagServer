import express from "express";
import { upload } from "../../Middleware/Multer.js"; 
import { 
  getFeatureSec, 
  createFeatureSec, 
  updateFeatureSec, 
  deleteFeatureSec 
} from "../../Controllers/Homepage/Features.js";

const FeatureSecRouter = express.Router();

// Middleware to handle 7 separate image uploads
const featureUploads = upload.fields([
  { name: "card1Img", maxCount: 1 },
  { name: "card2Img", maxCount: 1 },
  { name: "card3Img", maxCount: 1 },
  { name: "card4Img", maxCount: 1 },
  { name: "card5Img", maxCount: 1 },
  { name: "card6Img", maxCount: 1 },
  { name: "card7Img", maxCount: 1 },
]);

FeatureSecRouter.get("/", getFeatureSec);
FeatureSecRouter.post("/", featureUploads, createFeatureSec);
FeatureSecRouter.patch("/", featureUploads, updateFeatureSec); 
FeatureSecRouter.delete("/", deleteFeatureSec);

export default FeatureSecRouter;