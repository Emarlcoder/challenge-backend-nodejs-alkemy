import { DataTypes } from 'sequelize';
import { connection } from '../config/sequelize.js';
import pkg from 'jsonwebtoken'
const { sign } = pkg;
import dotenv from 'dotenv';
dotenv.config();

export default () => {
  let users = connection.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      field: 'id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  users.prototype.generateJWT = function () {
    const payload = {
      usersId: this.id,
      usersMail: this.email,
    };
    const password = 'password';
    return sign(payload, process.env.JWT_SECRET, {
      expiresIn: '72h',
    });
  };
  return users;
};
