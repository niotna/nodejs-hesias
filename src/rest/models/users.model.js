module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define("users", {
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    }
  });

  return users;
};