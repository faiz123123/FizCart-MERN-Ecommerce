const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER === "true";
const buildPath = path.join(__dirname, "..", "frontend", "build");
const indexPath = path.join(buildPath, "index.html");
const shouldServeFrontend = isProduction && fs.existsSync(indexPath);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes remain unchanged and continue to work as before.
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/ordersRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// In production, serve the built React app from frontend/build when it exists.
if (shouldServeFrontend) {
  app.use(express.static(buildPath));

  // Serve the React app for the root URL and for any non-API route.
  app.get("/", (req, res) => {
    res.sendFile(indexPath);
  });

  // Express 5 no longer accepts "*" in app.get(...), so use a regex catch-all instead.
  app.get(/.*/, (req, res) => {
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ message: "API route not found" });
    }

    res.sendFile(indexPath);
  });
} else {
  // Keep the development health check unchanged when the React build is not available.
  app.get("/", (req, res) => {
    res.send("FizCart backend is running properly");
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
