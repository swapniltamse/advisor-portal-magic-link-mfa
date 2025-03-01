// src/api/resetPassword.js
const jwt = require("jsonwebtoken");
const { getUserByToken, updatePassword } = require("../lib/dynamodb");

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    // Validate password requirements
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Find user by token
    const user = await getUserByToken(token);

    // Check if token exists and is not expired
    if (!user || user.resetTokenExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // In a real application, hash the password before storing
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    // For the POC, we'll just store the plain password
    await updatePassword(user.advisorId, newPassword);

    // Generate JWT for authentication
    const jwtSecret = process.env.JWT_SECRET;
    const authToken = jwt.sign(
      { userId: user.advisorId, email: user.email },
      jwtSecret,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Password reset successful",
      token: authToken,
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res
      .status(500)
      .json({ message: "An error occurred while resetting your password" });
  }
};

module.exports = resetPassword;
