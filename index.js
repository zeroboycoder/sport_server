const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdocs = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express"),
  cors = require("cors"),
  app = express(),
  PORT = process.env.PORT || 8000,
  routes = require("./routes"),
  authRoute = require("./routes/auth"),
  { authenticateToken } = require("./utils/middleware");

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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/users", authRoute);
app.use("/api/users", authenticateToken, routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
