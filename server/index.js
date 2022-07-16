const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require("dotenv/config");

const app = express();

// Import Routes
const userRoutes = require("./routes/user");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/api", userRoutes);

app.listen(3001, () => {
  console.log("Running on port 3001");
});
