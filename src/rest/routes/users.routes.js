module.exports = app => {
  const users = require("../controllers/users.controller.js");
  var router = require("express").Router();
  // Create a new User
  router.post("/", users.create);
  // Retrieve all Users
  router.get("/", users.findAll);
  // Retrieve a single User with id
  router.get("/:id", users.findOne);
  // Update an User with id
  router.put("/:id", users.update);
  // Update partialy an User with id
  router.patch("/:id", users.patch);
  // Delete a User with id
  router.delete("/:id", users.delete);
  // Delete all Users
  router.delete("/", users.deleteAll);
  app.use('/api/users', router);
};