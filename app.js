//jshint esversion:6
// import express from "express";
// import bodyParser from "body-parser";
const express = require("express");
const bodyParser = require("body-parser");
// const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const app = express();

// Connecting to Database
mongoose.connect("mongodb+srv://admin-akhil:abtbtdbt@cluster0.1ucpojt.mongodb.net/toDoListDB");

// Defining schema
const itemsSchema = {
  name: String
};

// Defining Model / Creating Collection
const Item = mongoose.model("Item", itemsSchema);

// Creating Documents inside the Item Collection and inserting them into the database
const item1 = new Item({
  name: "Welcome to your ToDo List!"
});
const item2 = new Item({
  name: "Hit the + button to add a new entry"
});
const item3 = new Item({
  name: "<-- Hit this to delete an entry"
});
const defaultItems = [item1, item2, item3];

// Reading Data from the Database onto the console
// Item.find({}).then(function(i){
//   i.forEach(function(n){
//     console.log(n.name);
//   });
// });

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req, res) {

  Item.find({}).then(function(foundItems){
    // if(foundItems.length === 0){
    //   Item.insertMany(defaultItems);
    //   res.redirect("/");
    // }else{
    //   res.render("list", {listTitle: "Today", newListItems: foundItems});
    // }
    res.render("list", {listTitle: "To Do List", newListItems: foundItems});
  });
  //const day = date.getDate();
});

app.post("/", function(req, res){
  const itemName = req.body.newItem;
  const itemN = new Item({
    name: itemName
  });
  itemN.save();
  res.redirect("/");
});

app.post("/delete",function(req,res){
  // console.log(req.body.checkbox);
  Item.deleteOne({_id: req.body.checkbox}).then(function(err){
    if(err){console.log(err);}
    else{console.log("Deleted.")}
  });
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
