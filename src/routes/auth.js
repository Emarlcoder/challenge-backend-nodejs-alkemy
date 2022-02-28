import { Router } from 'express'
import * as userController from '../controllers/users.js'

export const userRouter = Router()

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        name:
 *         type: string
 *         description: User's name
 *        email:
 *         type: email
 *         description: User's email
 *        password:
 *         type: string
 *         format: password
 *         description: User's password
 *      required:
 *       - name
 *       - email
 *       - password
 *      example:
 *        name: John Doe
 *        email: johndoe@gmail.com
 *        password: password
 */

/**
 * @swagger
 * /auth/signup:
 *  post:
 *   summary: Create a new user
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          $ref: '#/components/schemas/User'
 *   responses:
 *    201:
 *     description: The user has been created
 *    400:
 *     description: The user already exists
 *    500:
 *     description: Error creating the user
 */

/**
 * @swagger
 * /auth/signin:
 *  post:
 *   summary: Sign in a user
 *   tags: [User]
 *   requestBody:
 *    required: true
 *    content:
 *      application/json:
 *        schema:
 *          type: object
 *          example:
 *            email: johndoe@gmail.com
 *            password: password
 *   responses:
 *    201:
 *     description: Welcome
 *    400:
 *     description: Wrong password
 *    500:
 *     description: Error signing in
 */

userRouter
  .post('/auth/signup', userController.register)

userRouter
  .post('/auth/signin', userController.login)