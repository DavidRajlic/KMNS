const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const teamRoutes = require("./routes/TeamRoutes");
const MatchRoutes = require("./routes/MatchRoutes");
const PlayersRoutes = require("./routes/PlayerRoutes");
const cors = require("cors");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use("/teams", teamRoutes);
app.use("/matches", MatchRoutes);
app.use("/players", PlayersRoutes);

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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Strežnik posluša na http://localhost:${PORT}`);
});
