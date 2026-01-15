// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const EventSecSchema = new SCHEMA(
  {
 
   tag:{
        type: String,
      required: true,
   },
    Htext:{
        type: String,
      required: true,
     
   },   
   
  },
  { timestamps: true }
);

export const EventSec = mongoose.model("EventSec", EventSecSchema);
export default EventSec;
