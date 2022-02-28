import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

export const connection = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_TYPE,
    port: process.env.DATABASE_PORT,
    logging: false,
  }
);
