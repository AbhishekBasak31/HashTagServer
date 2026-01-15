import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const FeatureSecSchema = new SCHEMA(
  {
    tag:{
        type: String,
      required: true,
   },
    Htext:{
        type: String,
      required: true,
   },
    card1Img:{
        type: String,
      required: true,
   },
    card1tag:{
        type: String,
      required: true,
   },
    card1Htext:{
        type: String,
      required: true,
   },
    card1Dtext:{
        type: String,
      required: true,
   },
    card2Img:{
        type: String,
      required: true, 
   },
    card2tag:{
        type: String,
      required: true,
   },
    card2Htext:{
        type: String,
      required: true,
   },
    card2Dtext:{
        type: String,
      required: true,
   },
  card3Img:{
        type: String,
      required: true, 
   },
    card3tag:{
        type: String,
      required: true,
   },
    card3Htext:{
        type: String,
      required: true,
   },
    card3Dtext:{
        type: String,
      required: true,
   },
    card4Img:{
        type: String,
      required: true, 
   },
    card4tag:{
        type: String,
      required: true,
   },
    card4Htext:{
        type: String,
      required: true,
   },
    card4Dtext:{
        type: String,
      required: true,
   },
    card5Img:{
        type: String,
      required: true, 
   },
    card5tag:{
        type: String,
      required: true,
   },
    card5Htext:{
        type: String,
      required: true,
   },
    card5Dtext:{
        type: String,
      required: true,
   },
    card6Img:{
        type: String,
      required: true, 
   },
    card6tag:{
        type: String,
      required: true,
   },
    card6Htext:{
        type: String,
      required: true,
   },
    card6Dtext:{
        type: String,
      required: true,
   },

  },{ timestamps: true }
);
export const FeatureSec = mongoose.model("FeatureSec", FeatureSecSchema);