import { Offer } from "../../Models/Global/Offers.js";

// Create New Offer
export const createOffer = async (req, res) => {
  try {
    const { offerType, offerValue, text, validTill } = req.body;

    if (!offerType || !offerValue || !text || !validTill) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newOffer = await Offer.create({
      offerType,
      offerValue,
      text,
      validTill,
      isActive: true
    });

    return res.status(201).json({ success: true, data: newOffer });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Offers
export const getOffers = async (req, res) => {
  try {
    // Sort by latest created
    const offers = await Offer.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: offers });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Toggle Active Status
export const toggleOfferStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findById(id);

    if (!offer) {
      return res.status(404).json({ success: false, message: "Offer not found" });
    }

    offer.isActive = !offer.isActive;
    await offer.save();

    return res.status(200).json({ success: true, message: "Status updated", data: offer });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Offer
export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    await Offer.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Offer deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};