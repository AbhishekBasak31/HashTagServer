import express from "express";
import { 
    createOffer, 
    getOffers, 
    toggleOfferStatus, 
    deleteOffer 
} from "../../Controllers/Global/Offer.js";

const OfferRouter = express.Router();

OfferRouter.post("/", createOffer);
OfferRouter.get("/", getOffers);
OfferRouter.patch("/:id/toggle", toggleOfferStatus);
OfferRouter.delete("/:id", deleteOffer);

export default OfferRouter;