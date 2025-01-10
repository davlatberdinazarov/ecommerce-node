const authService = require("../services/authService");

class AuthController {
  static async register(req, res) {
    try {
      const user = await authService.register(req.body.email, req.body.password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken } = await authService.login(email, password);
      res.json({ accessToken, refreshToken });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  static async logout(req, res) {
    try {
      const userId = req.user.id; // Middleware orqali foydalanuvchini oling
      const result = await authService.logout(userId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async refreshTokens(req, res) {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshTokens(refreshToken);
      res.json(tokens);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
