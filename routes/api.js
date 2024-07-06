const express = require("express");
const router = express.Router();
const User = require("../models/User");
const mongoose = require("mongoose");

// const User = mongoose.model("User", user);

// Sign-up route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const emailPattern = /^[a-z]+\.\d{2}\.[a-z]+@[a-z]+\.[a-z]+\.[a-z]+$/;

  if (emailPattern.test(email) === false) {
    return res.status(400).json({ message: "Invalid email" });
  }

  //validation
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  if (username.length < 3) {
    return res
      .status(400)
      .json({ message: "Username should be at least 3 characters long" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password should be at least 6 characters long" });
  }

  try {
    const newUser = {
      username,
      email,
      password,
    };
    newUser.password = await bcrypt.hash(password, 10);
    const user = new User(newUser);
    await user.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

module.exports = router;
