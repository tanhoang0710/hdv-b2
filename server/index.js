const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Order = require("./orderModel");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.post("", async (req, res) => {
  try {
    const { companyID, orderNumber } = req.body;
    const order = await Order.findOne({
      companyID,
      orderNumber,
    });
    if (!order)
      return res.status(404).json({
        status: "fail",
        message: "Bạn chưa đặt đơn",
      });

    return res.status(200).json({
      status: "success",
      order,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message,
    });
  }
});

const DB = "mongodb://localhost:27017/bt2";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
  })
  .catch((err) => console.log(err));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
