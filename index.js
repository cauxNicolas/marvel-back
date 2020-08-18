const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

// mongoose
mongoose.connect("mongodb://localhost/marvel-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const routesHome = require("./routes/home");
app.use(routesHome);
const routesregister = require("./routes/register");
app.use(routesregister);

app.all(`*`, (req, res) => {
  try {
    res.status(200).json(`app.all -> route inconnue !`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(3100, () => {
  console.log("serveur MARVEL");
});
