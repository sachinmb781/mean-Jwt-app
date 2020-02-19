const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RegisterSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String
});
const RegisterModel = mongoose.model("register", RegisterSchema);
module.exports = RegisterSchema;
module.exports = RegisterModel;
