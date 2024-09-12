const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (!authToken) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is required",
      success: false,
    });
  }

  try {
    const decodedInfo = jwt.verify(authToken, process.env.JWT_SECRET);

    req.user = decodedInfo; // we are sending the user data in the `req` object
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Unauthorized, JWT token is Invalid or Expired",
      success: false,
    });
  }
};

module.exports = authenticateUser;
