const express = require("express");
const router = express.Router();
const moongoose = require("mongoose");
const RegisterModel = require("../model/user");
const Jwt = require("jsonwebtoken");
var url =
  "mongodb+srv://sachin:rest123@cluster0-ahvgi.mongodb.net/test?retryWrites=true&w=majority";

moongoose.connect(
  url,
  { useUnifiedTopology: true, useNewUrlParser: true },
  err => {
    if (err) {
      throw err;
    }
    console.log("database is connected");
  }
);

router.use("/register", (req, res) => {
  // var registerdata = {
  //   firstname: "Stryker01",
  //   lastname: "yureka09",
  //   email: "strykermithu@gmail.com",
  //   password: "Stryker09090908"
  // };
  var registerdata = req.body;
  var register = new RegisterModel(registerdata);
  register.save(err => {
    if (err) {
      console.log(err);
    }
    console.log(register);
    let payload = register.email;
    let token = Jwt.sign(payload, "myKey");
    res.send({ token });
  });
});

router.use("/login", (req, res) => {
  // let useremail = "strykermithu@gmail";
  // let pass = "Stryker090909";
  let data = req.body;
  let useremail = data.email;
  let pass = data.password;
  console.log(useremail);
  console.log(pass);
  RegisterModel.findOne({ email: useremail }, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!user) {
      res.status(402).send("No mail found with this mail");
      return;
    }
    if (user.password != pass) {
      res.status(401).send("wrong password");
      return;
    }

    let payload = { subject: user._id };
    let token = Jwt.sign(payload, "myKey");
    console.log(token);
    res.send({ token });
  });
});
function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("unauthorized request");
  }
  let token = req.headers.authorization.split(" ")[1];
  if (token === "null") {
    return res.status(401).send("unauthorized request");
  }
  let payload = Jwt.verify(token, "myKey");

  if (!payload) {
    return res.status(401).send("unauthorized request");
  }
  req.userId = payload.subject;
  next();
}

router.get("/home", verifyToken, (req, res) => {
  let homdata = [
    {
      id: "1",
      employee_name: "Tiger Nixon",
      employee_salary: "320800",
      employee_age: "61",
      profile_image: ""
    },
    {
      id: "2",
      employee_name: "Garrett Winters",
      employee_salary: "170750",
      employee_age: "63",
      profile_image: ""
    },
    {
      id: "3",
      employee_name: "Ashton Cox",
      employee_salary: "86000",
      employee_age: "66",
      profile_image: ""
    },
    {
      id: "4",
      employee_name: "Cedric Kelly",
      employee_salary: "433060",
      employee_age: "22",
      profile_image: ""
    }
  ];
  res.json(homdata);
});

module.exports = router;
