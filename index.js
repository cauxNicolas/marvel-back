require("dotenv").config();
const md5 = require(`md5`);

const ts = `1`;
const keyPublic = process.env.MARVEL_KEY_PUBLIC;
const keyPrivate = process.env.MARVEL_KEY_PRIVATE;

console.log(md5(ts + keyPrivate + keyPublic));
