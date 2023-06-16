const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdocs = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express"),
  app = express(),
  PORT = process.env.PORT || 8000,
  routes = require("./routes"),
  authRoute = require("./routes/auth"),
  { authenticateToken } = require("./utils/middleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Swagger UI
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dia-Sport API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:8000/",
      },
    ],
  },
  apis: ["./routes/swagger.js"],
};

const spacs = swaggerJsdocs(options);

app.use("/api/users", authRoute);
app.use("/api/users", authenticateToken, routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
