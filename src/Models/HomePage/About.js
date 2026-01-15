import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const HomeAboutSchema = new SCHEMA(
  {
   Htext:{
      type: String,
      required: true,
   },
   Dtext:{
      type: String,
      required: true,
   },
   tab1Icon:{
    type: String,
      required: true,
   },
   tab2Icon:{
    type: String,
      required: true,
   },
   tab3Icon:{
    type: String,
      required: true,
   },
   tab1Name:{
    type: String,
      required: true,
   },
   tab2Name:{
    type: String,
      required: true,
   },
   tab3Name:{
    type: String,
      required: true,
   },
   tab1Bp1:{
    type: String,
      required: true,
   },
   tab1Bp2:{
    type: String,
      required: true,
   },
   tab1Bp3:{
    type: String,
      required: true,
   },
   tab2Bp1:{
    type: String,
      required: true,
   },
   tab2Bp2:{
    type: String,
      required: true,
   },
   tab2Bp3:{
    type: String,
      required: true,
   },
   tab3Bp1:{
    type: String,
      required: true,
   },
   tab3Bp2:{
    type: String,
      required: true,
   },
   tab3Bp3:{
    type: String,
      required: true,
   },
    centerLogo:{
        type: String,
      required: true,
     
   },
   outerorbitImg1:{
        type: String,
      required: true,
     
   },
   outerorbitText1:{
        type: String,
      required: true,
     
   },
   outerorbitImg2:{
        type: String,
      required: true,
     
   },
   outerorbitText2:{
        type: String,
      required: true,
     
   },
   outerorbitImg3:{
        type: String,
      required: true,
     
   },
   outerorbitText3:{
        type: String,
      required: true,
     
   },
   outerorbitImg4:{
        type: String,
      required: true,
     
   },
   outerorbitText4:{
        type: String,
      required: true,
     
   },
   innerorbitImg1:{
        type: String,
      required: true,
     
   },
   innerorbitText1:{
        type: String,
      required: true,
     
   },
   innerorbitImg2:{
        type: String,
      required: true,
     
   },
   innerorbitText2:{
        type: String,
      required: true,
     
   },
   innerorbitImg3:{
        type: String,
      required: true,
     
   },
   innerorbitText3:{
        type: String,
      required: true,
     
   },
   innerorbitImg4:{
        type: String,
      required: true,
     
   },
   innerorbitText4:{
        type: String,
      required: true,
     
   },
  },{ timestamps: true }
);
export const HomeAbout = mongoose.model("HomeAbout", HomeAboutSchema);