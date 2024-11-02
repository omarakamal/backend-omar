// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db/index.js");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
const { isAutheticated } = require("./middleware/jwt.middleware.js");
app.use('/auth',require('./routes/auth.routes.js'))

app.use("/api", indexRoutes);

app.use('/api',isAutheticated,require('./routes/author.routes.js'))

app.use('/',isAutheticated,require('./routes/books.routes.js'))

app.use('/',isAutheticated,require('./routes/genres.routes.js'))




// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
