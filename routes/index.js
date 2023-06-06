const route = require("express").Router();
const authController = require("../controllers/authController");
const paymentController = require("../controllers/paymentController");
const depositController = require("../controllers/depositController");
const { body } = require("express-validator");

// Authentication
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

route.put("/update-agent/:userId", authController.updateAgent);

route.delete("/delete-agent/:userId", authController.deleteAgent);

route.get("/agent-profile/:userId", authController.agentProfile);

route.post("/init", authController.initUser);

// Payment
route.post("/create-payment-provider", paymentController.createPaymentProvider);

route.get("/payment-accounts", paymentController.fetchPaymentAccounts);

route.post("/create-payment-account", paymentController.createPaymentAccount);

route.get("/", (req, res) => res.send("Hello World"));

// Deposit
route.post("/deposit", depositController.deposit);

route.get("/deposits", depositController.fetchDeposits);

route.put("/update-deposit", depositController.updateDeposit);

module.exports = route;
