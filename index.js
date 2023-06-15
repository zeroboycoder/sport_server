const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdocs = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express"),
  app = express(),
  PORT = process.env.PORT || 8000,
  routes = require("./routes");

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
// app.use("/", (req, res) => {
//   res.send("Welcome to Dia-Sport USER SERVICE API");
// });
app.use("/api/users", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spacs));

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
