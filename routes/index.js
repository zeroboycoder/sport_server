const route = require("express").Router();
const userController = require("../controllers/user");
const agentController = require("../controllers/agentController");
const depositController = require("../controllers/depositController");

route.get("/", (req, res) => res.send("Hello World"));

route.post("/register", userController.registerUser);

route.post("/signin", userController.signinUser);

route.get("/users", userController.fetchUsers);

route.put("/update-user/:userId", userController.updateUser);

route.delete("/delete-user/:userId", userController.deleteUser);

// Agents
route.post("/create-agent", agentController.createAgent);

route.post("/signin-agent", agentController.fetchAgent);

// Deposit
route.post("/deposit", depositController.deposit)

module.exports = route;
