import { Router } from 'express';
import * as genresController from '../controllers/genres.js';
import { watchman } from '../utils/validations.js';

export const genresRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   genres:
 *    type: object
 *    properties:
 *      name:
 *        type: string
 *        description: The name of the genre
 *      image:
 *        type: string
 *        description: The image of the genre
 *    required:
 *     - name
 *     - image
 *    example:
 *     name: Sciene Fiction
 *     image: https://i.pinimg.com/564x/ff/dc/46/ffdc46fc9e7742449cc9807b31f4ae4f.jpg
 */

/**
 * @swagger
 * /genres:
 *  post:
 *   summary: Create a new genre
 *   tags: [Genres]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          $ref: '#/components/schemas/genres'
 *   responses:
 *    201:
 *     description: The genre has been created
 *    400:
 *     description: The genre already exists
 *    500:
 *     description: Error creating the genre
 */

/**
 * @swagger
 * /genres:
 *  get:
 *   summary: Get all genres
 *   tags: [Genres]
 *   parameters:
 *    - in: query
 *      name: name
 *      schema:
 *        type: string
 *        description: The name of the genres you are looking for
 *    - in: query
 *      name: genre
 *      schema:
 *        type: integer
 *        description: The genre of the genres you are looking for
 *    - in: query
 *      name: order
 *      schema:
 *        type: integer
 *        description: The order to show the genres you are looking for
 *   responses:
 *    200:
 *      description: The genres have been found
 *    404:
 *      description: The genres have not been found
 *    500:
 *      description: Error getting the genres
 */

genresRouter.route('/genres')
  .post(watchman, genresController.addGenre)
  .get(watchman, genresController.showGenres)

/**
 * @swagger
 * /genres/{id}:
 *  put:
 *    summary: Update a genre
 *    tags: [Genres]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/genres'
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          description: The id of the genre you want to update
 *    responses:
 *      200:
 *        description: The genre has been updated
 *      400:
 *        description: The genre does not exist
 *      500:
 *        description: Error updating the genre
 */

/**
 * @swagger
 * /genres/{id}:
 *  delete:
 *    summary: Delete a genre
 *    tags: [Genres]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          description: The id of the genre you want to delete
 *    responses:
 *      200:
 *        description: The genre has been deleted
 *      400:
 *        description: The genre does not exist
 *      500:
 *        description: Error deleting the genre
 */


genresRouter.route('/genres/:id')
  .put(watchman, genresController.updateGenre)
  .delete(watchman, genresController.deleteGenre)