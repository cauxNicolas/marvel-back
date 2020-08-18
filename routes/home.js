const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post("/home", async (req, res) => {
  try {
    const email = req.fields.email;
    const password = req.fields.password;

    if (req.fields.email && req.fields.password) {
      const findUser = await User.findOne({ email: email });

      if (findUser) {
        const mongoToken = findUser.token;
        const mongoHash = findUser.hash;
        const mongoSalt = findUser.salt;
        const mongoLastname = findUser.lastname;
        const hashPassword = SHA256(password + mongoSalt).toString(encBase64);

        if (hashPassword === mongoHash) {
          res.status(200).json({
            message: `Connexion réussie`,
            token: mongoToken,
            lastname: mongoLastname,
          });
        } else {
          res.status(401).json({ message: "mot de passe erroné" });
        }
      } else {
        res.status(400).json({ message: "email inexistant" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
