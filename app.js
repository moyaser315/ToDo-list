//          required npms :
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const day = require(__dirname + "/day.js"); //local file
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/todolist');
//                        mongoose scheme
const itemsScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});
const Item = mongoose.model("itemList", itemsScheme);
//                    to use ejs
app.set('view engine', 'ejs');
//                    to start server
app.listen(3000, function() {
  console.log("service has started on port 3000");
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
let items=[];
let workList=[]
let today=day();

app.get("/", function(req, res) {
  res.render("lists", {
    kindOfDay: today,
    newItem : names
  });
})
app.post("/", function(req, res) {
  let newItem = new Item({
    name: req.body.new
  });
    newItem.save();
 names.push(newItem);
    res.redirect("/");

})
app.get("/about", function(req, res) {
  res.render("about");
})
app.post("/delete",function(req,res){
  //storing value of check box
  let x =req.body.check;
  //fiinding its index
  let index=names.indexOf(x);
  //splicing it and removing it from the items list
  names.splice(index,1);
  //deleting it from db
  Item.deleteOne({name:x},function(err){if(err){console.log(err)};})
  res.redirect("/");
})