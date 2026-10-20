import express from "express";
import { register, login, logout, getMe } from "../controllers/auth.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protect, getMe);
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

export default router;