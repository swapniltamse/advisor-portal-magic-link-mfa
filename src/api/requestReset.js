const crypto = require("crypto");
const { getUserByEmail, saveResetToken } = require("../lib/dynamodb");
const { sendPasswordResetEmail } = require("../lib/email");

const requestReset = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user by email
    const user = await getUserByEmail(email);

    // Always return the same response whether user exists or not for security
    if (!user) {
      return res.status(200).json({
        message:
          "If your email exists in our system, you will receive a password reset link",
      });
    }

    // Generate reset token and expiry
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour validity

    // Save token to user record
    await saveResetToken(user.advisorId, resetToken, resetTokenExpiry);

    // Create reset URL
    const baseUrl =
      process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    // Send email
    await sendPasswordResetEmail(user, resetUrl);

    res.status(200).json({
      message:
        "If your email exists in our system, you will receive a password reset link",
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while processing your request" });
  }
};

module.exports = requestReset;
