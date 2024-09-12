const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    products: [
      {
        name: "I Phone",
        price: 10000,
      },
      {
        name: "Macbook",
        price: 80000,
      },
    ],
    message: "Products Fetched Successfully",
    success: true,
  });
});

module.exports = router;
