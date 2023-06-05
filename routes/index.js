const route = require("express").Router();
const authController = require("../controllers/authController");
const paymentController = require("../controllers/paymentController");
const depositController = require("../controllers/depositController");
const { body } = require("express-validator");

// Authentication
route.post(
  "/create-user",
  [
    body(
      "phone",
      "Phone number length between 9 and 11 and; start with 0"
    ).isLength({ min: 9, max: 11 }),
    body("password", "Password must not be empty").trim().notEmpty(),
  ],
  authController.create
);

route.post(
  "/signin-user",
  [
    body(
      "phone",
      "Phone number length between 9 and 11 and; start with 0"
    ).isLength({ min: 9, max: 11 }),
    body("password", "Password must not be empty").trim().notEmpty(),
  ],
  authController.signin
);

// Payment
route.post("/create-payment-provider", paymentController.createPaymentProvider);

route.get("/payment-accounts", paymentController.fetchPaymentAccounts);

route.post("/create-payment-account", paymentController.createPaymentAccount);


route.get("/", (req, res) => res.send("Hello World"));

// route.post("/register", userController.registerUser);

// route.post("/signin", userController.signinUser);

// route.get("/users", userController.fetchUsers);

// route.put("/update-user/:userId", userController.updateUser);

// route.delete("/delete-user/:userId", userController.deleteUser);

// Agents
route.post("/create-agent", agentController.createAgent);

route.post("/signin", agentController.signin);

route.put("/update-agent", agentController.updateAgent);

route.get("/deposits", depositController.fetchDeposits);

route.put("/update-deposit", depositController.updateDeposit);

module.exports = route;
