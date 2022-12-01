const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Router = require("./routes/route")

// App use
const app = express();
app.use(cors())
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/raffle');

// Database configuration
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Router
app.use(Router);

// Server listining
app.listen(3000, () => {
    console.log("Server is running at port 3000");
  });
