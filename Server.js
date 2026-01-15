import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import os from "os";

import DB_Connection from "./src/DB/DB.js";

// --- Import All Routers ---
import UserRouter from "./src/Routers/Global/User.js";
import SocialRouter from "./src/Routers/Global/Social.js";
import FooterRouter from "./src/Routers/Global/Footer.js";
import ContactRouter from "./src/Routers/Global/Contact.js";
import EnquiryRouter from "./src/Routers/Global/Enquiry.js";
import ContactDetailsRouter from "./src/Routers/Global/ContactDetails.js";
import AboutPageRouter from "./src/Routers/AboutPage/AboutPage.js";
import HomeBannerRouter from "./src/Routers/Homepage/Banner.js";
import HomeAboutRouter from "./src/Routers/Homepage/About.js"
import QuickLinkRouter from "./src/Routers/Global/QuickLinks.js";
import GalleryEventRouter from "./src/Routers/Global/GalleryEvent.js";
import GallerySecRouter from "./src/Routers/Global/GallerySec.js";
import EventRouter from "./src/Routers/Global/Event.js";
import EventSecRouter from "./src/Routers/Global/EventSec.js";
import NewsRouter from "./src/Routers/Global/News.js";
import NewsSecRouter from "./src/Routers/Homepage/NewsSec.js";
import FeatureSecRouter from "./src/Routers/Homepage/Features.js";
import DiningRouter from "./src/Routers/DiningPage/Diningpage.js";




const app = express();
const PORT = process.env.PORT || 7000;

/* -------------------------------------------------------
   GET LOCAL NETWORK IP (for dev logging only)
------------------------------------------------------- */
function getLocalIP() {
  try {
    const nets = os.networkInterfaces();
    for (const name in nets) {
      for (const iface of nets[name]) {
        if ((iface.family === "IPv4" || iface.family === 4) && !iface.internal) {
          return iface.address;
        }
      }
    }
  } catch (err) {
    console.warn("Local IP error:", err);
  }
  return "127.0.0.1";
}

const localIP = getLocalIP();

/* -------------------------------------------------------
   SECURITY & PERFORMANCE MIDDLEWARE
------------------------------------------------------- */
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(cookieParser());

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

/* -------------------------------------------------------
   CORS CONFIG (FINAL & CORRECT)
------------------------------------------------------- */

// IMPORTANT:
// Frontend runs on https://fingertip.co.in/cdautomation
// Browser Origin = https://fingertip.co.in (NO PATH)

const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:8080",
  "http://localhost:8086",
  `http://${localIP}:5173`,
  `http://${localIP}:5174`,
  `http://${localIP}:8080`,
  `http://${localIP}:8086`,
  "https://fingertip.co.in", // ✅ PRODUCTION ORIGIN
]);

// Optional env-based origin (safe)
if (process.env.FRONTEND_URL) {
  try {
    const url = new URL(process.env.FRONTEND_URL);
    allowedOrigins.add(url.origin);
  } catch {
    allowedOrigins.add(process.env.FRONTEND_URL);
  }
}

console.log("🌐 Allowed Origins:", [...allowedOrigins]);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow Postman / curl / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      console.warn("❌ Blocked CORS Origin:", origin);
      return callback(new Error("CORS: Origin not allowed"));
    },
    credentials: true,
  })
);

/* -------------------------------------------------------
   REQUEST DEBUG (SAFE)
------------------------------------------------------- */
app.use((req, res, next) => {
  console.log("→", req.method, req.originalUrl);
  console.log("  Origin:", req.headers.origin || "(none)");
  next();
});

/* -------------------------------------------------------
   HEALTH CHECK
------------------------------------------------------- */
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "production",
  });
});

/* -------------------------------------------------------
   API ROUTES
------------------------------------------------------- */
app.use("/api/v1/user", UserRouter);
app.use("/api/v1/contact", ContactRouter);
app.use("/api/v1/enquiry", EnquiryRouter);
app.use("/api/v1/footer", FooterRouter);
app.use("/api/v1/social", SocialRouter);
app.use("/api/v1/contactdetail", ContactDetailsRouter);
app.use("/api/v1/news", NewsRouter);
app.use("/api/v1/newsec",NewsSecRouter);
app.use("/api/v1/gallery/event",GalleryEventRouter );
app.use("/api/v1/quicklink", QuickLinkRouter);
app.use("/api/v1/event", EventRouter);

// Home page
app.use("/api/v1/home/banner", HomeBannerRouter);
app.use("/api/v1/home/about", HomeAboutRouter);
app.use("/api/v1/home/featuresec", FeatureSecRouter);
// About page
app.use("/api/v1/aboutpage", AboutPageRouter);
//Dining page
app.use("/api/v1/diningpage", DiningRouter);
// Gallery page
app.use("/api/v1/gallerypage", GallerySecRouter);
//Eventpage
app.use("/api/v1/eventsec", EventSecRouter);


/* -------------------------------------------------------
   DATABASE & SERVER START
------------------------------------------------------- */
DB_Connection(process.env.DB_URI, process.env.DB_NAME)
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 Production API ready`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
