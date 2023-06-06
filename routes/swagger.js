const route = require("express").Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          required:
 *              - phone
 *              - token
 *              - user_code
 *              - status
 *              - ban_end_date
 *              - agent
 *              - role
 *              - wallet
 *          properties:
 *              id:
 *                  type: int
 *                  description: User ID
 *              token:
 *                  type: string
 *                  description: JWT Token
 *              user_code:
 *                  type: string
 *                  description: User Code
 *              status:
 *                  type: boolean
 *                  description: User Status
 *              ban_end_date:
 *                  type: DateTime
 *                  description: Ban End Date
 *              agent:
 *                 type: object
 *                 description: Agent Data
 *              role:
 *                  type: object
 *                  description: Role Data
 *              wallet:
 *                  type: object
 *                  description: Wallet Data
 *          example:
 *              token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTY4NjA4MTM3NX0.gw4-Uup-9Ru7sQ0ztYS4ov9jJIggku2QK8oBOzr759Y
 *              user_code: mgmg56
 *              status: true
 *              ban_end_date: null
 *              agent:
 *                id : 1
 *                name : Mg Mg
 *                address : yangon
 *                secret_code : 6ki7lbg1
 *                userId: 1
 *              role:
 *                id : 1
 *                name : agent
 *              wallet:
 *                id : 1
 *                type : main
 *                amount : 120000
 *                userId : 1
 */

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: User Authentication
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Information
 */

// =====================
// Authentication
// =====================
/**
 * @swagger
 * /create-agent:
 *  post:
 *      summary: Create an agent.
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        phone:
 *                          type: string
 *                        password:
 *                          type: string
 *                        name:
 *                          type: string
 *                        address:
 *                          type: string
 *      responses:
 *          200:
 *              description: Agent created successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 */

/**
 * @swagger
 * /signin-agent:
 *  post:
 *      summary: Sign in agent.
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        phone:
 *                          type: string
 *                        password:
 *                          type: string
 *      responses:
 *          200:
 *              description: Agent created successfully.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 */

/**
 * @swagger
 * /update-agent/{userId}:
 *  put:
 *      summary: Update agent data
 *      tags: [Auth]
 *      parameters:
 *          -   in: path
 *              name : agentId
 *              schema:
 *                  type: int
 *              required: true
 *              description: The agent user id
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                        phone:
 *                          type: string
 *                        address:
 *                          type: string
 *      responses:
 *          200:
 *              description: Update succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 *          404:
 *              description:  Book not found
 *          400:
 *              description: Something wrong in server
 */

/**
 * @swagger
 * /delete-agent/{userId}:
 *  delete:
 *      summary: Delete the agent
 *      tags: [Auth]
 *      parameters:
 *          -   in: path
 *              name : agentId
 *              schema:
 *                  type: int
 *              required: true
 *              description: The agent user id
 *      responses:
 *          200:
 *              description: Delete succesfully
 *          404:
 *              description: Book not found
 */

// =====================
// User Information
// =====================
/**
 * @swagger
 * /init:
 *  post:
 *      summary: Get member when init app.
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        player_id:
 *                          type: string
 *                        player_name:
 *                          type: string
 *                        unit_amount:
 *                          type: string
 *                        agent_code:
 *                          type: string
 *      responses:
 *          200:
 *              description: .
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 */

/** @swagger
 * /agent-profile/{userId}:
 *  get:
 *      summary: Get the one agent data.
 *      tags: [User]
 *      responses:
 *          200:
 *              description: Successful.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 */

module.exports = route;
