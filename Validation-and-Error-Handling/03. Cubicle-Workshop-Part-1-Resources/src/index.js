// Imports
const express = require("express");

const handlebarsConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const dbConnect = require("./config/dbConfig");
const errorHandler = require("./middlewares/errorHandlerMiddleware");

const { PORT } = require("./constants");
const routes = require("./router");

// Local variables
const app = express();

// Configs
expressConfig(app);
handlebarsConfig(app);

// Connecting to the database
dbConnect()
  .then(() => console.log("Successfully connected to the DB!"))
  .catch((err) => console.log(`Error while connecting in DB: ${err}`));

// Routing
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
