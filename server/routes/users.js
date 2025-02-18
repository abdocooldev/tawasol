import express from "express";
import { check, validationResult } from "express-validator";
const router = express.Router();

router.post(
  "/",
  check("name", "Name is required!").notEmpty(),
  check("email", "Please Type a Valid Email!").isEmail(),
  check("password", "Please Choose a password at least 6 characters!").isLength(
    { min: 6 }
  ),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    res.send("Data has been sent successfully.");
  }
);

export default router;
