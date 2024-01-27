const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
  res.send({ message: "bienvenido" });
});
//Port
const port = process.env.PORT || 3000;
const uri = process.env.DB_URI;

//Midleware

app.use(cors());
app.use(express.json());

//Routes
const userRoute = require("./Routes/UserRoute");
app.use("/user", userRoute);
app.listen(port, () => {
  console.log(`servidor corriendo ${port}`);
});

//Conexion Mongoose
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
