const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/connection");

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Enabling Cors
app.use(cors());

// Enable static path
app.use(express.static("images"));

app.get(`/`, (req, res) => res.send("Api Running"));

// Define Routes
const users = require("./routes/users");
const departments = require("./routes/departments");
const vehicles = require("./routes/vehicles");
const summary = require("./routes/summary");
const counts = require("./routes/counts");

app.use(`/api/users`, users);
app.use(`/api/departments`, departments);
app.use(`/api/vehicles`, vehicles);
app.use(`/api/summary`, summary);
app.use(`/api/counts`, counts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
