const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(process.env.TOKEN, salt);

exports.generateToken = () =>
  jwt.sign({ hash }, process.env.TOKEN, {
    expiresIn: "86400s",
  });
