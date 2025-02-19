//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");


const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose.connect("mongodb://127.0.0.1:27017/userDB3");

const userSchema = new mongoose.Schema({
  email: String,
  password:String
});


userSchema.plugin(encrypt,{secret:process.env.SECRET, encryptedFields:["password"]});


const User = mongoose.model("User",userSchema);



app.get("/",function(req,res){
  res.render("home");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.get("/login",function(req,res){
  res.render("login");
});

app.post("/register",function(req,res){
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User ({
    email:  username,
    password: password
  });

  newUser.save().then(function(saved){
    if(saved){
      res.render("secrets");
    }
  }).catch(function(err){
    console.log(err);
  });
});

app.post("/login",function(req,res){

});

app.listen(3000,function(){
  console.log("server is up and running");
});
