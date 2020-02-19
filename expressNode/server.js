const express = require("express");
const app = express();
const cors = require("cors");
const bodyparser = require("body-parser");
const routes = require("./routes/router");
const PORT = 3000;
app.use(cors());
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use("/routes", routes);
app.listen(PORT, err => {
  if (err) throw err;
  console.log(`the server is running on ${PORT}`);
});
