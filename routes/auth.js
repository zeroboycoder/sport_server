const route = require("express").Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");

route.post(
  "/create-agent",
  [
    body(
      "phone",
      "Phone number length between 7 and 11 and; start with 0"
    ).isLength({ min: 7, max: 11 }),
    body("password", "Password must not be empty").trim().notEmpty(),
  ],
  authController.createAgent
);

route.post(
  "/signin-agent",
  [
    body(
      "phone",
      "Phone number length between 7 and 11 and; start with 0"
    ).isLength({ min: 7, max: 11 }),
    body("password", "Password must not be empty").trim().notEmpty(),
  ],
  authController.signinAgent
);

route.post("/init", authController.initUser);

module.exports = route;
