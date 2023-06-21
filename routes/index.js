const route = require("express").Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");
const agentUserController = require("../controllers/agentUserController");
const paymentController = require("../controllers/paymentController");
const depositController = require("../controllers/depositController");

// Authentication
route.put("/update-agent/:userId", authController.updateAgent);

route.delete("/delete-agent/:userId", authController.deleteAgent);

route.get("/agent-profile/:userId", authController.agentProfile);

// Agent & User
route.get("/init-agent", agentUserController.initAgent);

route.post(
  "/init",
  [
    body("player_id")
      .notEmpty()
      .withMessage("player_id is required")
      .isInt()
      .withMessage("player_id must be an integer"),
    body("player_name")
      .notEmpty()
      .withMessage("player_name is required")
      .trim(),
    body("unit_amount")
      .notEmpty()
      .withMessage("unit_amount is required")
      .isInt()
      .withMessage("unit_amount must be an integer"),
    body("agent_code").notEmpty().withMessage("agent_code is required").trim(),
  ],
  authController.initUser
);

route.get("/get-users", agentUserController.getUsers);

route.put("/update-user-status", agentUserController.updateUserStatus);

// Payment
route.post("/create-payment-provider", paymentController.createPaymentProvider);

route.get("/payment-providers", paymentController.fetchPaymentProviders);

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

route.get("/test", async (req, res) => {
  res.send("Hello User Service");
});

module.exports = route;
