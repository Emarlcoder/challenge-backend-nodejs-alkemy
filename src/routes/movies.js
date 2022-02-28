import { Router } from 'express';
import * as moviesController from '../controllers/movies.js';
import { watchman } from '../utils/validations.js';

export const moviesRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Movies:
 *    type: object
 *    properties:
 *      image:
 *        type: string
 *        description: The image of the movie
 *      title:
 *        type: string
 *        description: The title of the movie
 *      realese_date:
 *        type: date
 *        description: The realese date of the movie
 *      rate:
 *        type: integer
 *        description: The rate of the movie between 1 and 5
 *    required:
 *     - image
 *     - title
 *     - realese_date
 *     - rate
 *    example:
 *     image: https://i.pinimg.com/564x/ff/dc/46/ffdc46fc9e7742449cc9807b31f4ae4f.jpg
 *     title: Star Wars - Revenge of the Sith
 *     realese_date: 2005-05-19
 *     rate: 5
 */

/**
 * @swagger
 * /movies:
 *  post:
 *   summary: Create a new movie
 *   tags: [Movies]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          $ref: '#/components/schemas/Movies'
 *   responses:
 *    201:
 *     description: The movie has been created
 *    400:
 *     description: The movie already exists
 *    500:
 *     description: Error creating the movie
 */

/**
 * @swagger
 * /movies:
 *  get:
 *   summary: Get all movies
 *   tags: [Movies]
 *   parameters:
 *    - in: query
 *      name: name
 *      schema:
 *        type: string
 *        description: The name of the movies you are looking for
 *    - in: query
 *      name: genre
 *      schema:
 *        type: integer
 *        description: The genre of the movies you are looking for
 *    - in: query
 *      name: order
 *      schema:
 *        type: integer
 *        description: The order to show the movies you are looking for
 *   responses:
 *    200:
 *      description: The movies have been found
 *    404:
 *      description: The movies have not been found
 *    500:
 *      description: Error getting the movies
 */


moviesRouter
  .route('/movies')
  .post(watchman, moviesController.addMovie)
  .get(watchman, moviesController.showMovies);

/**
 * @swagger
 * /movies/{id}:
 *  get:
 *    summary: Get a movie
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          description: The id of the movie you are looking for
 *    responses:
 *      200:
 *        description: The movie has been retrieved
 *      400:
 *        description: The movie does not exist
 *      500:
 *        description: Error retrieving the movie
 */

/**
 * @swagger
 * /movies/{id}:
 *  put:
 *    summary: Update a movie
 *    tags: [Movies]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Movies'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          description: The id of the movie you want to update
 *    responses:
 *      200:
 *        description: The movie has been updated
 *      400:
 *        description: The movie does not exist
 *      500:
 *        description: Error updating the movie
 */

/**
 * @swagger
 * /movies/{id}:
 *  delete:
 *    summary: Delete a movie
 *    tags: [Movies]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          description: The id of the movie you want to delete
 *    responses:
 *      200:
 *        description: The movie has been deleted
 *      400:
 *        description: The movie does not exist
 *      500:
 *        description: Error deleting the movie
 */

moviesRouter
  .route('/movies/:id')
  .get(watchman, moviesController.movieDetails)
  .put(watchman, moviesController.updateMovie)
  .delete(watchman, moviesController.deleteMovie);

