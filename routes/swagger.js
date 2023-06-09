const route = require("express").Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: User Authentication
 */

/**
 * @swagger
 * tags:
 *  name: Payment
 *  description: Payment Information
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: User Information
 */

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
 * components:
 *  schemas:
 *      Payment-Account:
 *          type: object
 *          required:
 *              - name
 *              - account_number
 *              - status
 *              - qr_code
 *              - paymentProviderId
 *              - payment_provider
 *          properties:
 *              name:
 *                  type: int
 *                  description: User ID
 *              account_number:
 *                  type: string
 *                  description: JWT Token
 *              status:
 *                  type: boolean
 *                  description: User Status
 *              qr_code:
 *                  type: string
 *                  description: Ban End Date
 *              paymentProviderId:
 *                 type: int
 *                 description: Agent Data
 *              payment_provider:
 *                  type: object
 *                  description: Role Data
 *          example:
 *              name: Mg Mg
 *              account_number: "09123456789"
 *              status: true
 *              qr_code: ""
 *              paymentProviderId: 1
 *              payment_provider:
 *                id : 1
 *                name : KBZ Pay
 *                logo : ""
 *                type : mobile banking
 *                status: true
 */

/**
 * @swagger
 * components:
 *  schemas:
 *      Deposit:
 *          type: object
 *          required:
 *              - amount
 *              - sender_id
 *              - sender_account_name
 *              - sender_account_number
 *              - transaction_number
 *              - confirm
 *              - sender
 *              - paymentAccount
 *          properties:
 *              amount:
 *                  type: int
 *                  description: Deposit Amount
 *              sender_id:
 *                  type: int
 *                  description: Sender ID
 *              sender_account_name:
 *                  type: string
 *                  description: User Sender Account Name
 *              sender_account_number:
 *                  type: string
 *                  description: Sender Account Number
 *              transaction_number:
 *                  type: string
 *                  description: Transaction number
 *              confirm:
 *                  type: string
 *                  description: Deposit confirm or not or reject
 *              sender:
 *                 type: object
 *                 description: Sender detail
 *              paymentAccount:
 *                  type: object
 *                  description: Payment account detail
 *          example:
 *              amount: 120000
 *              sender_id: 1
 *              sender_account_name: "Kyaw Kyaw"
 *              sender_account_number: "09123456789"
 *              transaction_number: 18123456
 *              confirm: "false"
 *          sender:
 *               id: 1
 *               phone: "09987654321"
 *               password: "$2b$10$z4W86E59ukSiGo2zdjGQVe/..1R7o0w7j1O4VPrLVr8KmEZQxKbS2"
 *               user_code: "mgmg32"
 *               status: true
 *               ban_end_date: null
 *               createdAt: "2023-06-08T03:39:54.424Z"
 *               updatedAt: "2023-06-08T03:39:54.424Z"
 *               roleId: 1
 *          paymentAccount:
 *                id: 1
 *                name: "Mg Mg"
 *                account_number: "09123456789"
 *                status: true
 *                qr_code: ""
 *                paymentProviderId: 1
 *
 *
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
 *                          type: int
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

// =====================
// Payment
// =====================
/**
 * @swagger
 * /create-payment-provider:
 *  post:
 *      summary: Create a payment provider
 *      tags: [Payment]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                        type:
 *                          type: string
 *      responses:
 *          200:
 *              description: .
 *              content:
 *                  application/json:
 *                      schema:
 *                        type: object
 *                        properties:
 *                          id:
 *                            type : int
 *                          name:
 *                            type : string
 *                          type:
 *                            type : string
 *                          status:
 *                            type : boolean
 *                        example:
 *                          id: 1
 *                          name: KBZ Pay
 *                          type: Mobile Banking
 *                          status: true
 */

/**
 * @swagger
 * /delete-payment-providers/:provider_id:
 *  delete:
 *      summary: Delete the provider
 *      tags: [Payment]
 *      parameters:
 *          -   in: path
 *              name : provider_id
 *              schema:
 *                  type: int
 *              required: true
 *              description: The payment provider id
 *      responses:
 *          200:
 *              description: Delete succesfully
 *          404:
 *              description: Something went wrong.
 */

/**
 * @swagger
 * /create-payment-account:
 *  post:
 *      summary: Create a payment account
 *      tags: [Payment]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        name:
 *                          type: string
 *                        accountNumber:
 *                          type: string
 *                        status:
 *                          type: boolean
 *                        qrCode:
 *                          type: string
 *                        paymentProviderID:
 *                          type: int
 *      responses:
 *          200:
 *              description: .
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Payment-Account"
 */

/** @swagger
 * /payment-accounts:
 *  get:
 *      summary: Get the payment accounts.
 *      tags: [Payment]
 *      responses:
 *          200:
 *              description: Successful.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Payment-Account"
 */

/**
 * @swagger
 * /delete-payment-accounts/:account_id:
 *  delete:
 *      summary: Delete the provider
 *      tags: [Payment]
 *      parameters:
 *          -   in: path
 *              name : account_id
 *              schema:
 *                  type: int
 *              required: true
 *              description: The payment provider id
 *      responses:
 *          200:
 *              description: Delete succesfully
 *          404:
 *              description: Something went wrong.
 */

// =====================
// Deposit
// =====================
/**
 * @swagger
 * /deposit:
 *  post:
 *      summary: Deposit to the agent
 *      tags: [Deposit]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                        sender_id:
 *                          type: int
 *                        amount:
 *                          type: int
 *                        sender_account_name:
 *                          type: string
 *                        sender_account_number:
 *                          type: string
 *                        payment_account_id:
 *                          type: int
 *                        transaction_number:
 *                          type: string
 *      responses:
 *          200:
 *              description: .
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/Deposit"
 */

/**
 * @swagger
 * /update-deposit:
 *  put:
 *      summary: Update agent data
 *      tags: [Deposit]
 *      parameters:
 *          -   in: path
 *              name : user_id
 *              schema:
 *                  type: int
 *              required: true
 *              description: The user id
 *          -   in: path
 *              name : deposit_id
 *              schema:
 *                  type: int
 *              required: true
 *              description: The deposit id
 *          -   in: path
 *              name : confirm
 *              schema:
 *                  type: string
 *              required: true
 *              description: The confirmation status
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

/** @swagger
 * /deposits:
 *  get:
 *      summary: Get the deposits
 *      tags: [Deposit]
 *      responses:
 *          200:
 *              description: Successful.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/User"
 */

module.exports = route;
