import { Router } from "express";
import bcrypt from "bcrypt";
import userModel from "../db/schema";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password)
  const userExists = await userModel.findOne({ username: username });

  if (userExists) {
    res.status(403).json({ message: "username already exists" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      password: hashedPassword,
    });
    if (process.env.JWT_SECRET) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token, message: "user signed up" });
    }
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username: username });
  console.log(username, password)
  if (user) {
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (passwordMatches && process.env.JWT_SECRET) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ token, message: "user signed in" });
    }
    else{
      res.status(403).json({ message: "username or password incorrect" });
    }
  } else {
    res.status(403).json({ message: "user not found" });
  }
});

export default router;
