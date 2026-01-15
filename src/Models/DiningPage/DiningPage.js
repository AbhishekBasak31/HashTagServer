import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";


const FoodMenuSchema = new SCHEMA(
  {
  title: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String ,
    required: true 
  },
  desc: { 
    type: String ,
    required: true 
  },
  img1: { 
   type: String ,
    required: true 
  },
   img2: { 
   type: String ,
    required: true 
  },
   img3: { 
   type: String ,
    required: true 
  },
   img4: { 
   type: String ,
    required: false 
  },
   img5: { 
   type: String ,
    required: false 
  },
  img6: { 
   type: String ,
    required: false
  },
  img7: { 
   type: String ,
    required: false
  },
  img8: { 
   type: String ,
    required: false
  },
  img9: { 
   type: String ,
    required: false
  },
  img10: { 
   type: String ,
    required: false
  },
}
);

const DiningPageSchema = new SCHEMA(
  {
  tag:{
    type: String,
    required: true,
  },
  Htext:{
    type: String,
    required: true,
  },
  Dtext:{
    type: String,
    required: true,
  },
  diningIcon:{
    type: String,
    required: true,
  },
  Menu:[FoodMenuSchema]
  
  },
  { timestamps: true }
);

export const DiningPage = mongoose.model("DiningPage", DiningPageSchema);
