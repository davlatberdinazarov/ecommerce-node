// AuthService.js
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const TokenUtils = require("../utils/TokenUtils");

class AuthService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  // Register a new user
  async register(email, password) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ email, password: hashedPassword });
    return await user.save();
  }

  // Log in a user
  async login(email, password) {
    const user = await this.userModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role, // Role ni qo'shish
    };

    const accessToken = TokenUtils.generateAccessToken(payload);
    const refreshToken = TokenUtils.generateRefreshToken(payload);

    // Save the refresh token
    user.refreshToken = refreshToken;
    await user.save();
    // console.log(user, accessToken, refreshToken);
    return { accessToken, refreshToken };
  }

  // Log out a user
  async logout(userId) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // Clear the refresh token
    user.refreshToken = null;
    await user.save();

    return { message: "Logged out successfully" };
  }

  // Refresh access and refresh tokens
  async refreshTokens(refreshToken) {
    try {
      const payload = TokenUtils.verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET);

      const user = await this.userModel.findById(payload.id);
      if (!user || user.refreshToken !== refreshToken) {
        throw new Error("Invalid refresh token");
      }

      const accessToken = TokenUtils.generateAccessToken({ id: user._id });
      const newRefreshToken = TokenUtils.generateRefreshToken({ id: user._id });

      user.refreshToken = newRefreshToken;
      await user.save();

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new Error("Refresh token is invalid or expired");
    }
  }
}

module.exports = new AuthService(User);
