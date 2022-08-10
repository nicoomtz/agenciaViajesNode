import Sequelize from "sequelize";
import dotenv from "dotenv/config";

const db = new Sequelize(
  proccess.env.DB_NAME,
  proccess.env.DB_USER,
  proccess.env.DB_PASS,
  {
    host: proccess.env.DB_HOST,
    port: "3306",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorAliases: false,
  }
);

export default db;
