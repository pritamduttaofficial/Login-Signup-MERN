const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./connectDB/db");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user.route");
const productRouter = require("./routes/product.route");
const authenticateUser = require("./middlewares/auth");

const app = express();

connectDB()
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(`MongoDB connection error : ${error.message}`));

app.use(cors());
// we can pass configuration to cors() to allow only specific PORTs or domains for more security. Here we are accepting requests from any origin.

app.use(bodyParser.json());

app.use("/user", userRouter);

// if we want this route to be protected, we insert the auth middleware before the route handler
app.use("/product", authenticateUser, productRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});
