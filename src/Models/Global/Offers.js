// models/Offer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const OfferSchema = new SCHEMA(
  {
    offerType: {
      type: String,
      enum: ["PERCENTAGE", "CASH"],
      required: true,
    },

    offerValue: {
      type: Number, // 20 => 20% | 500 => ₹500
      required: true,
    },

    text: {
      type: String,
      required: true, // display text
    },

    validTill: {
      type: Date,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export const Offer = mongoose.model("Offer", OfferSchema);
export default Offer;
