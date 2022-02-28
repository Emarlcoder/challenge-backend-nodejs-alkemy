import express from 'express';
import { connection } from './sequelize.js';
import { charactersRouter } from '../routes/characters.js';
import { moviesRouter } from '../routes/movies.js';
import { userRouter } from '../routes/auth.js';
import { genresRouter } from '../routes/genres.js';
import SwaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Disney API',
      version: '1.0.0',
      description: 'API for Disney Movies and Characters Database',
      contact: {
        name: 'Emanuel',
        email: 'emarlcoder@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [`${path.join(__dirname, '../routes/*.js')}`]
};
export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.app.use(express.json());
    this.routes();
  }
  start() {
    this.app.listen(this.port, async () => {
      console.log(`Server running on: http://localhost:${this.port}`);
      try {
        await connection.sync({ force: true });
        console.log('Database synchronyzed');
      } catch (error) {
        console.log(error);
      }
    });
  }
  routes() {
    this.app.use(charactersRouter);
    this.app.use(genresRouter);
    this.app.use(moviesRouter);
    this.app.use(userRouter);
    this.app.use(
      '/api-doc',
      SwaggerUi.serve,
      SwaggerUi.setup(swaggerJsdoc(swaggerSpec))
    );
  }
}
