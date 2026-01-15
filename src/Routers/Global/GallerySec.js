import express from "express";
import { 
  getGallerySec, 
  createGallerySec, 
  updateGallerySec, 
  deleteGallerySec 
} from "../../Controllers/Global/GallerySec.js";

const GallerySecRouter = express.Router();

// No :id parameters because it's a singleton
GallerySecRouter.get("/", getGallerySec);
GallerySecRouter.post("/", createGallerySec);
GallerySecRouter.patch("/", updateGallerySec); // Use PATCH or PUT
GallerySecRouter.delete("/", deleteGallerySec);

export default GallerySecRouter;