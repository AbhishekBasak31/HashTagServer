import express from "express";
import { upload } from "../../Middleware/Multer.js"; 
import { 
  getContactDetails, 
  createContactDetails, 
  updateContactDetails, 
  deleteContactDetails 
} from "../../Controllers/Global/ContactDetails.js";

const ContactDetailsRouter = express.Router();

// Upload middleware for the video field
const contactUploads = upload.fields([
  { name: "RightsecVedio", maxCount: 1 }
]);

ContactDetailsRouter.get("/", getContactDetails);
ContactDetailsRouter.post("/", contactUploads, createContactDetails);
ContactDetailsRouter.patch("/", contactUploads, updateContactDetails); 
ContactDetailsRouter.delete("/", deleteContactDetails);

export default ContactDetailsRouter;