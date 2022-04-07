const { users } = require("../models");
const db = require("../models/index");
const Users = db.users;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }

    // Create an User
    const user = {
      lastname: req.body.lastname ?? null,
      firstname: req.body.firstname ?? null,
      email: req.body.email ?? null
    };
    // Save User in the database
    try {
      const users = await Users.create(user)
      res.send(users);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    }
};

// Retrieve all Users from the database.
exports.findAll = async (req, res) => {
    try {
      const users = await Users.findAll()
      res.send(users);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
    try {
      const id = req.params.id;
      const users = await Users.findByPk(id)
      if (users) {
        res.send(users);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    }
};

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Users.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
    });
};

// Update partially an User by the id in the request
exports.patch = (req, res) => {
    const id = req.params.id;
    Users.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was patched successfully."
          });
        } else {
          res.send({
            message: `Cannot patch User with id=${id}. Maybe User was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error patching User with id=" + id
        });
    });
};

// Delete an User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Users.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
    });
};
// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    Users.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Users were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Users."
        });
    });
};
