import { Router } from 'express';
import * as charactersController from '../controllers/characters.js';
import { watchman } from '../utils/validations.js';

export const charactersRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Characters:
 *    type: object
 *    properties:
 *      image:
 *        type: string
 *      name:
 *        type: string
 *      age:
 *        type: integer
 *      weight:
 *        type: integer
 *      history:
 *        type: string
 *    required:
 *     - image
 *     - name
 *     - age
 *     - weight
 *     - history
 *    example:
 *     image: https://i.pinimg.com/564x/8f/44/85/8f4485e533bb482a7c4583149fd7ca4f.jpg
 *     name: Darth Vader
 *     age: 35
 *     weight: 200
 *     history: He was a Dark Lord of the Sith, a Sith Lord, and a Jedi Master. He was the first to die in the Clone Wars.
 */

/**
 * @swagger
 * /characters:
 *  post:
 *   summary: Create a new character
 *   tags: [Characters]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          example:
 *           image: https://i.pinimg.com/564x/8f/44/85/8f4485e533bb482a7c4583149fd7ca4f.jpg
 *           name: Darth Vader
 *           age: 35
 *           weight: 200
 *           history: He was a Dark Lord of the Sith, a Sith Lord, and a Jedi Master. He was the first to die in the Clone Wars.
 *           movieId: 1
 *   responses:
 *    201:
 *     description: The character has been created
 *    400:
 *     description: The character already exists
 *    500:
 *     description: Error creating the character
 */

/**
 * @swagger
 * /characters:
 *  get:
 *   summary: Get all characters
 *   tags: [Characters]
 *   parameters:
 *    - in: query
 *      name: name
 *      schema:
 *        type: string
 *        description: The name of the character you are looking for
 *    - in: query
 *      name: weight
 *      schema:
 *        type: integer
 *        description: The weight of the character you are looking for
 *    - in: query
 *      name: age
 *      schema:
 *        type: integer
 *        description: The age of the character you are looking for
 *    - in: query
 *      name: movie
 *      schema:
 *        type: integer
 *        description: The movieId of the character you are looking for
 *   responses:
 *    200:
 *      description: The characters have been found
 *    404:
 *      description: The characters have not been found
 *    500:
 *      description: Error getting the characters
 */

charactersRouter
  .route('/characters')
  .post(watchman, charactersController.addCharacter)
  .get(watchman, charactersController.showCharacters);

/**
 * @swagger
 * /characters/{id}:
 *  get:
 *    summary: Get a character
 *    tags: [Characters]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          description: The id of the character you are looking for
 *    responses:
 *      200:
 *        description: The character has been retrieved
 *      400:
 *        description: The character does not exist
 *      500:
 *        description: Error retrieving the character
 */

/**
 * @swagger
 * /characters/{id}:
 *  put:
 *    summary: Update a character
 *    tags: [Characters]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            example:
 *              image: https://i.pinimg.com/564x/8f/44/85/8f4485e533bb482a7c4583149fd7ca4f.jpg
 *              name: Darth Vader
 *              age: 35
 *              weight: 200
 *              history: He was a Dark Lord of the Sith, a Sith Lord, and a Jedi Master. He was the first to die in the Clone Wars.
 *              movieId: 1
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          description: The id of the character you want to update
 *    responses:
 *      200:
 *        description: The character has been updated
 *      400:
 *        description: The character does not exist
 *      500:
 *        description: Error updating the character
 */

/**
 * @swagger
 * /characters/{id}:
 *  delete:
 *    summary: Delete a character
 *    tags: [Characters]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *          description: The id of the character you want to delete
 *    responses:
 *      200:
 *        description: The character has been deleted
 *      400:
 *        description: The character does not exist
 *      500:
 *        description: Error deleting the character
 */


charactersRouter
  .route('/characters/:id')
  .get(watchman, charactersController.characterDetails)
  .put(watchman, charactersController.updateCharacter)
  .delete(watchman, charactersController.deleteCharacter);
