const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// Import API handlers
const requestReset = require("./src/api/requestReset");
const verifyToken = require("./src/api/verifyToken");
const resetPassword = require("./src/api/resetPassword");
const setupTestUsers = require("./src/api/setup");

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
app.get("/api/setup", setupTestUsers);

// Simple health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/reset-password", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "reset-password.html"));
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

// Error handling middleware
app.use(errorHandler);

module.exports = app;
