const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("connected", () => {
  console.log("Database is connected");
});
mongoose.connection.on("error", (err) => {
  console.error("Database connection error:", err);
});

app.get("/", (req,res) => {
   return res.send('HomePage');
});


app.post("/api/calender", require("./Controllers/CalenderController"));








app.listen(5000, () => {
  console.log("server started on 5000");
});
