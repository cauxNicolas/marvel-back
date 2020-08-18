require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

// mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const routesHome = require("./routes/home");
app.use(routesHome);
const routesregister = require("./routes/register");
app.use(routesregister);

app.listen(process.env.PORT || 3100, () => {
  console.log("serveur MARVEL");
});
