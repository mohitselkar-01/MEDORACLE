const { Sequelize } = require("sequelize");
const path = require("path");

const dialect = process.env.DB_DIALECT || "mysql";

let sequelize;

if (dialect === "sqlite") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../database.sqlite"),
    logging: false
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME || "medoracle",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
      host: process.env.DB_HOST || "localhost",
      dialect: "mysql",
      logging: false,
      retry: { max: 1 }
    }
  );
}

module.exports = sequelize;

