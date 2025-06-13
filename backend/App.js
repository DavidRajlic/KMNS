const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 4000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Povezava z MongoDB uspešna!");
  })
  .catch((err) => {
    console.error("Napaka pri povezavi z MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Strežnik posluša na http://localhost:${port}`);
});
