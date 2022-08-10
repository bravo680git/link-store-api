import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import refreshTokenModel from "../models/refreshToken.model.js";
import env from "../config/env.js";

const register = async (req, res) => {
  const account = req.body;
  const { username, password, passwordConfirm } = account;
  if (password !== passwordConfirm) {
    return res.status(400).json("Confirm password must simillar as password");
  }
  try {
    const user = await userModel.findOne({ username: username });

    if (!user) {
      await userModel.create({ username, password });
      res.json("Registered new account sucessful");
    } else {
      res.status(400).json("Username has already existed");
    }
  } catch (error) {
    res.status(500).json("Fail to create new account:" + error);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await userModel.findOne({ username, password });

    if (account) {
      const userId = account._id;
      const authToken = jwt.sign(
        { userId: userId },
        env.ACCESS_TOKEN_SECRET_KEY,
        { expiresIn: 3600 }
      );

      const refreshToken = jwt.sign(
        {
          userId: userId,
        },
        env.REFRESH_TOKEN_SECRET_KEY,
        { expiresIn: 7 * 3600 }
      );

      await refreshTokenModel.findOneAndUpdate(
        { userId },
        { userId, refreshToken },
        { upsert: true }
      );

      res.json({
        role: account.role,
        authToken,
        refreshToken,
      });
    } else {
      res.status(400).json("Username or password are incorrect");
    }
  } catch (error) {
    res.status(500).json("Fail to login:" + error);
  }
};

const refreshToken = async (req, res) => {
  let refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.status(403);

  try {
    const trustRefreshToken = await refreshTokenModel.findOne({ refreshToken });

    if (!trustRefreshToken) {
      return res.status(403).json("Forbiden");
    } else {
      const { userId } = jwt.verify(refreshToken, env.REFRESH_TOKEN_SECRET_KEY);
      const authToken = jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: 3600,
      });

      refreshToken = jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: 7 * 3600,
      });

      await refreshTokenModel.findOneAndUpdate(
        {
          userId,
        },
        {
          userId,
          refreshToken,
        },
        { upsert: true }
      );

      res.json({
        authToken,
        refreshToken,
      });
    }
  } catch (error) {
    res.json(error);
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.userId;
    await refreshTokenModel.findOneAndDelete({ userId });
    res.json("Log out successfully");
  } catch (error) {
    res.status(500).json("Fail to log out: " + error);
  }
};

export default { register, login, refreshToken, logout };
