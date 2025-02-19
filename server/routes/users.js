import express from "express";
import { check, validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "config";

const router = express.Router();

router.post(
  "/",
  check("name", "Name is required!").notEmpty(),
  check("email", "Please Type a Valid Email!").isEmail(),
  check("password", "Please Choose a password at least 6 characters!").isLength(
    { min: 6 }
  ),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists!" }] });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwt_secret_key"),
        { expiresIn: "5 days" },
        (err, token) => {
          if (err) {
            return res.status(500).json({ msg: "Server error" });
          } else {
            res.json({ token });
          }
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  }
);

export default router;
