const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "name, email and password is required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exist", success: false });
    }

    const newUser = new User({ name, email, password });

    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.status(201).json({ message: "Signup successfully", success: true });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
      success: false,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(400).json({
        message: "email and password is required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Authentication Failed, User doesn't exist",
        success: false,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Authentication Failed, Password doesn't match",
        success: false,
      });
    }

    // create jwt token if user exist and is authenticated.
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login success",
      success: true,
      jwtToken,
      email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: `Internal Server Error: ${error.message}`,
      success: false,
    });
  }
};

module.exports = { signupController, loginController };
