const route = require("express").Router();
const userController = require("../controllers/user");

route.get("/", (req, res) => res.send("Hello World"));

route.post("/register", userController.registerUser);

route.post("/signin", userController.signinUser);

route.get("/users", userController.fetchUsers);

route.put("/update-user/:userId", userController.updateUser);

route.delete("/delete-user/:userId", userController.deleteUser);

module.exports = route;
