import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const ContactDetailsSchema = new SCHEMA(
  {
     LeftsecTag:{
      type: String,
      required: true,
    },
    LeftsecHtext:{
      type: String,
      required: true,
    },
    LeftsecDtext:{
      type: String,
      required: true,
    },
    RightsecHtext:{
      type: String,
      required: true,
    },
    RightsecDtext:{
      type: String,
      required: true,
    },
    RightsecVedio:{
        type: String,
      required: true,
    },
    whour:{
      type: String,
      require: true,
    },
    email:{
    type: String,
      require: true,
    },
    phone:{
        type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    map:{
      type: String,
      require: true,
    }
  
  },{ timestamps: true }
);
export const ContactDetails = mongoose.model("ContactDetails", ContactDetailsSchema);