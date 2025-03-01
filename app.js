const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Import API handlers
const requestReset = require("./src/api/requestReset");
const verifyToken = require("./src/api/verifyToken");
const resetPassword = require("./src/api/resetPassword");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// API endpoints
app.post("/api/request-reset", requestReset);
app.get("/api/verify-token/:token", verifyToken);
app.post("/api/reset-password", resetPassword);

// Simple health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Catch-all route for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server if not running in Lambda
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
