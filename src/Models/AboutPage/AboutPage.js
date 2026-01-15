import mongoose from "mongoose";
import { SCHEMA } from "../../Utils/Constant.js";

const AboutPageSchema = new SCHEMA(
  {
    BannerTag:{
      type: String,
      required: true, 
    },
    BannerImg:{
        type: String,
      required: true,   
   },
    BannerHtext:{
        type: String,
      required: true,   
   },
    CardImg:{
        type: String,
      required: true,
   }, 
    CardHtext:{
        type: String,
      required: true,
   }, 
    CardDtext:{
        type: String,
      required: true,
   }, 
  CardbottomIcon:{
        type: String,
      required: true,
   }, 
  CardbottomHtext:{
        type: String,
      required: true,
   }, 
  CardbottomDtext:{
        type: String,
      required: true,
   },
   Counter1:{
     type: String,
      required: true,
   }, 
   CounterText1:{
     type: String,
      required: true,
   },
   Counter2:{
     type: String,
      required: true,
   }, 
   CounterText2:{
     type: String,
      required: true,
   },
   Counter3:{
     type: String,
      required: true,
   }, 
   CounterText3:{
     type: String,
      required: true,
   }, 
  Counter4:{
     type: String,
      required: true,
   }, 
   CounterText4:{
     type: String,
      required: true,
   }, 
   Multicardtag:{
      type: String,
      required: true,
   },
  MulticardHtext:{
      type: String,
      required: true,
   },
  Multicard1icon:{
      type: String,
      required: true,
   },
  Multicard1htext:{
      type: String,
      required: true,
   },
  Multicard1dtext:{
      type: String,
      required: true,
   },
  Multicard2icon:{
      type: String,
      required: true,
   },
  Multicard2htext:{
      type: String,
      required: true,
   },
  Multicard2dtext:{
      type: String,
      required: true,
   },
  Multicard3icon:{
      type: String,
      required: true,
   },
  Multicard3htext:{
      type: String,
      required: true,
   },
  Multicard3dtext:{
      type: String,
      required: true,
   },
   teamHtext:{
      type: String,
      required: true,
   },
   teamDtext:{
      type: String,
      required: true,
   },
   teamimg1:{
      type: String,
      required: true,
   },
    teamdesig1:{
      type: String,
      required: true,
   },
    teamdename1:{
      type: String,
      required: true,
   },

    teamimg2:{
      type: String,
      required: true,
   },
    teamdesig2:{
      type: String,
      required: true,
   },
    teamdename2:{
      type: String,
      required: true,
   },
      teamimg3:{
      type: String,
      required: true,
   },
    teamdesig3:{
      type: String,
      required: true,
   },
    teamdename3:{
      type: String,
      required: true,
   },
    teamimg4:{
      type: String,
      required: false,
   },
    teamdesig4:{
      type: String,
      required: false,
   },
    teamdename4:{
      type: String,
      required: false,
   },
    teamimg5:{
      type: String,
      required: false,
   },
    teamdesig5:{
      type: String,
      required: false,
   },
    teamdename5:{
      type: String,
      required: false,
   },
  teamimg6:{
      type: String,
      required: false,
   },
    teamdesig6:{
      type: String,
      required: false,
   },
    teamdename6:{
      type: String,
      required: false,
   },
  teamimg7:{
      type: String,
      required: false,
   },
    teamdesig7:{
      type: String,
      required: false,
   },
    teamdename7:{
      type: String,
      required: false,
   },
  teamimg8:{
      type: String,
      required: false,
   },
    teamdesig8:{
      type: String,
      required: false,
   },
    teamdename8:{
      type: String,
      required: false,
   },
     teamimg9:{
      type: String,
      required: false,
   },
    teamdesig9:{
      type: String,
      required: false,
   },
    teamdename9:{
      type: String,
      required: false,
   },
   ctatext:{
      type: String,
      required: false,
   },
   buttonUrl:{
      type: String,
      required: false,
   }

  },{ timestamps: true }
);
export const AboutPage = mongoose.model("AboutPage", AboutPageSchema);