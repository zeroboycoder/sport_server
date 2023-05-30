const route = require("express").Router();
const userController = require("../controllers/user");
const agentController = require("../controllers/agentController");
const depositController = require("../controllers/depositController");
const { body } = require("express-validator");

// route.get("/", (req, res) => res.send("Hello World"));

// route.post("/register", userController.registerUser);

// route.post("/signin", userController.signinUser);

// route.get("/users", userController.fetchUsers);

// route.put("/update-user/:userId", userController.updateUser);

// route.delete("/delete-user/:userId", userController.deleteUser);

// Agents
route.post(
  "/create-agent",
  [
    body(
      "phone",
      "Phone number length between 9 and 11 and; start with 0"
    ).isLength({ min: 9, max: 11 }),
    body("password", "Password must not be empty").trim().notEmpty(),
  ],
  agentController.createAgent
);

route.post(
  "/signin",
  [
    body(
      "phone",
      "Phone number length between 9 and 11 and; start with 0"
    ).isLength({ min: 9, max: 11 }),
    body("password", "Password must not be empty").trim().notEmpty(),
  ],
  agentController.signin
);

route.put(
  "/update-agent",
  body("userId", "User id must not be empty").notEmpty(),
  agentController.updateAgent
);

route.delete(
  "/delete-agent",
  body("userId", "User id must not be empty").notEmpty(),
  agentController.deleteAgent
);

// Deposit
// route.post("/deposit", depositController.deposit)

module.exports = route;
