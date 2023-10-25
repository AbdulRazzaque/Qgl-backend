// import mongoose from "mongoose";
const mongoose = require("mongoose");



const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
})

// export default mongoose.model( "User",userSchema,"users")
module.exports = mongoose.model("User", userSchema, "users");
