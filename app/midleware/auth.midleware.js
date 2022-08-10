import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import env from "../config/env.js";

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : undefined;
  if (!token) {
    return res.status("403").json("No prohibit");
  }
  try {
    const { userId } = jwt.verify(token, env.ACCESS_TOKEN_SECRET_KEY);
    req.userId = userId;
    next();
  } catch (error) {
    res.status(401).json("Unauthorization");
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { role } = await userModel.findById(userId);
    if (role === "admin") {
      next();
    } else {
      res.status(403).json("No prohibit");
    }
  } catch (error) {
    res.status(500).json("Fail to check user's role");
  }
};

const checkAccDataIsValid = (req, res, next) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    return res.status(400).json("Username and passoword are required field");
  }
  if (username.length < 6 || password.length < 6) {
    return res
      .status(400)
      .json("Username or password must have at least 6 characters");
  }
  next();
};

export default { verifyToken, isAdmin, checkAccDataIsValid };
