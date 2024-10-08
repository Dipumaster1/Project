const connection = require("./connection");
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const routes = require("./routes");
app.use(express.json());
// System Middlewares
app.use(cors()); //

app.use("/uploads", express.static("uploads"));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("hello server");
});

app.listen(process.env.APP_PORT, () => {
  console.log("Server started at " + process.env.APP_PORT);
});
