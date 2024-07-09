const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./models/USER");
const bcrypt = require("bcrypt");

const bcryptSalt = bcrypt.genSaltSync(8);
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL);

app.get("/test", (req, res) => {
  res.json("text ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.listen(4000, () => {
  console.log("server running on port 4000");
});
