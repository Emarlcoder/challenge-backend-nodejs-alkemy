import { DataTypes } from "sequelize";
import { connection } from "../config/sequelize.js";

export default () =>
  connection.define("movies", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      field: 'id'
    },
    image: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    release_date: {
      type: DataTypes.DATE
    },
    rate: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    }
  })