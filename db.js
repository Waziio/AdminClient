import { Sequelize } from "sequelize";
import { config } from "./config/dbConfig.js";

export default new Sequelize(config.NAME, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: "mysql"
});

