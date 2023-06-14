const route = require("express").Router();
const authController = require("../controllers/authController");
const agentController = require("../controllers/agentController");
const paymentController = require("../controllers/paymentController");
const depositController = require("../controllers/depositController");
const { body } = require("express-validator");

// Test api
route.get("/", (req, res) => res.send("Hello World"));

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

// Agent
route.get("/init-agent", agentController.initAgent);

route.get("/get-users", agentController.getUsers);

route.get("/get-user", agentController.getUserByAgentCode);

// Payment
route.post("/create-payment-provider", paymentController.createPaymentProvider);

route.delete(
  "/delete-payment-providers/:provider_id",
  paymentController.deletePaymentProvider
);

route.get("/payment-accounts", paymentController.fetchPaymentAccounts);

route.post("/create-payment-account", paymentController.createPaymentAccount);

route.delete(
  "/delete-payment-accounts/:account_id",
  paymentController.deletePaymentAccounts
);

// Deposit
route.post("/deposit", depositController.deposit);

route.get("/deposits", depositController.fetchDeposits);

route.put("/update-deposit", depositController.updateDeposit);

module.exports = route;
