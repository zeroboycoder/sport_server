const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.sendStatus(401);
    res.send({
      status: "false",
      data: {},
      error: "Unauthorized token",
    });
  }

  jwt.verify(token, process.env.TOKEN, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(403);
      return res.send({
        status: "false",
        data: {},
        message: "Forbidden",
      });
    }

    const { hash } = result;
    const isVerify = bcrypt.compareSync(process.env.TOKEN, hash);
    if (isVerify) {
      next();
    } else {
      return res.send({
        status: "false",
        data: {},
        error: "Unauthorized token",
      });
    }
  });
};
