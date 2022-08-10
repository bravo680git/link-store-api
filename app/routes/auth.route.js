import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../midleware/auth.midleware.js";
const router = Router();

router.post(
  "/register",
  authMiddleware.checkAccDataIsValid,
  authController.register
);
router.post("/login", authMiddleware.checkAccDataIsValid, authController.login);
router.post("/refreshToken", authController.refreshToken);
router.post("/logout", authMiddleware.verifyToken, authController.logout);

export default router;
