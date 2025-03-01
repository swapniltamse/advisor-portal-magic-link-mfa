const { getUserByToken } = require("../lib/dynamodb");

const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res
        .status(400)
        .json({ valid: false, message: "Token is required" });
    }

    // Find user by token
    const user = await getUserByToken(token);

    // Check if token exists and is not expired
    if (!user || user.resetTokenExpiry < Date.now()) {
      return res
        .status(400)
        .json({ valid: false, message: "Invalid or expired token" });
    }

    // Token is valid
    res.status(200).json({
      valid: true,
      email: user.email,
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ valid: false, message: "An error occurred" });
  }
};

module.exports = verifyToken;
