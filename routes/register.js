const express = require("express");
const User = require("../models/User"); // accès BDD
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

router.post("/register", async (req, res) => {
  try {
    const name = req.fields.name;
    const lastname = req.fields.lastname;
    const email = req.fields.email;
    const password = req.fields.password;
    const confirmPassword = req.fields.confirmPassword;

    const searchEmail = await User.findOne({ email: email });

    if (password === confirmPassword) {
      // email existe deja en BDD ?
      if (searchEmail) {
        res.status(401).json({ message: "Email deja prsént en bdd" });
      } else {
        const salt = uid2(16);
        const token = uid2(16);

        const hashGenerate = SHA256(password + salt).toString(encBase64);

        const newUser = new User({
          name: name,
          lastname: lastname,
          email: email,
          hash: hashGenerate,
          token: token,
          salt: salt,
        });

        await newUser.save();
        res.status(200).json({ message: "new User created !" });
      }
    } else {
      res
        .status(400)
        .json({ message: "les mots de passe ne sont pas identiques" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
