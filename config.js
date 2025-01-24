const sequelize = require("sequelize");

const db = new sequelize(
  "bbanhbkrvdkyux99owxd",
  "ur8mflvcjqqne5ad",
  "4nBtmJYTIthD8Zwi6d4E",
  {
    host: "bbanhbkrvdkyux99owxd-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);

db.authenticate()
  .then(() => {
    console.log("Sucessfully Connected");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = db;
