const route = require("express").Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email
 *              - password
 *          properties:
 *              id:
 *                  type: int
 *                  description: User ID
 *              name:
 *                  type: string
 *                  description: User Name
 *              email:
 *                  type: string
 *                  description: User Email
 *              password:
 *                  type: string
 *                  description: User Password
 *          example:
 *              name: Mg Mg
 *              email: mgmg@email.com
 *              password : Passw0rd
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: User Authentication
 */

/**
 * @swagger
 * /register:
 *  post:
 *      summary: Register the user.
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      responses:
 *          200:
 *              description: User Registration.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 */

/**
 * @swagger
 * /signin:
 *  post:
 *      summary: User Login.
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/User"
 *      responses:
 *          200:
 *              description: user Login.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 */

module.exports = route;
