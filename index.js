const express = require("express"),
    app = express(),
    PORT = process.env.PORT || 8000,
    routes = require("./routes");

app.use(routes);

app.listen(PORT, () => console.log("Server is running."));
