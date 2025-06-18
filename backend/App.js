const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const teamRoutes = require("./routes/TeamRoutes");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use("/teams", teamRoutes);

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
