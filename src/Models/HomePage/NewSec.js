// models/Footer.js
import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const NewsSecSchema = new SCHEMA(
  {
    tag:{
    type: String,
      required: true,
    },
    Htext:{
  type: String,
      required: true,
    },
    dtext:{
  type: String,
      required: true,
    },
   icon1:{
        type: String,
      required: true,
   },
    counter1:{
        type: String,
      required: true,
     
   }, 
    text1:{
        type: String,
      required: true,
   },   
  icon2:{
        type: String,
      required: true,
   },
    counter2:{
        type: String,
      required: true,
     
   }, 
    text2:{
        type: String,
      required: true,
   },
     icon3:{
        type: String,
      required: true,
   },
    counter3:{
        type: String,
      required: true,
     
   }, 
    text3:{
        type: String,
      required: true,
   },
   
  },
  { timestamps: true }
);

export const NewsSec= mongoose.model("NewsSec", NewsSecSchema);
export default NewsSec;
