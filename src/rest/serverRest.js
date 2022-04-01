const express = require("express");
const app = express();
const db = require("./models/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  try {
    await db.sequelize.authenticate();
    // await db.sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

require("./routes/users.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});