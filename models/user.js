import sequelize from "sequelize";
import db from "../db.js";

const { DataTypes } = sequelize;

const User = db.define("user", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  lastname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(250),
    allowNull: false,
  },
});

export default User;
