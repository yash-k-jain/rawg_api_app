const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");

const dbConnection = require("./db");

const app = express();

dbConnection();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(express.static(path.join(__dirname, "../client/build")));

app.use("/api/v1", require("./routes/games"));
app.use("/api/v1", require("./routes/auth"));
app.use("/api/v1", require("./routes/user"));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
