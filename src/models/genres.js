import { DataTypes } from 'sequelize';
import { connection } from '../config/sequelize.js';

export default () =>
  connection.define('genres', {
    genres_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });