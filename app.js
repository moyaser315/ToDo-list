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
var items=[];
let workList=[]
let today=day.getDay();
Item.find({},function(err,docs){
  if(err){
    console.log(err);
  }else{
    docs.forEach(function(log) {
      items.push(log.name);
    });
  }
})

app.get("/", function(req, res) {
  res.render("lists", {
    kindOfDay: today,
    newItem : items,
    path:"/"
  });
})
app.post("/", function(req, res) {
  if(req.body.new==''){
    res.redirect("/");
  }else{
     let newItem = new Item({
    name: req.body.new
  });
    newItem.save();
    items=[];
    items.push(newItem.name);
  Item.find({},function(err,docs){
    if(err){
      console.log(err);
    }else{
      docs.forEach(function(log) {
        items.push(log.name);
      });
    }
  })
    res.redirect("/");
}
})
app.get("/about", function(req, res) {
  res.render("about");
})
app.post("/delete",function(req,res){
  //storing value of check box
  let x =req.body.check;
  //fiinding its index
  let index=items.indexOf(x);
  //splicing it and removing it from the items list
  items.splice(index,1);
  //deleting it from db
  Item.deleteOne({name:x},function(err){if(err){console.log(err)};})
  res.redirect("/");
})
//////////////////////// craeting new routes
app.get("/:route",function(req,res){
res.render("lists",{
  kindOfDay: req.params.route,
  newItem:items,
  path:"/"+req.params.route
})
})
app.post("/:route",function(req,res){
  let path ="/"+ req.params.route ;
  let list = req.params.route + "List";
  let newList = mongoose.model(list,itemsScheme)
  if(req.body.new==''){
    res.redirect(path);
    items=[];
  newList.find({},function(err,docs){
    if(err){
      console.log(err);
    }else{
      docs.forEach(function(log) {
        items.push(log.name);
      });
    }
  });
  }else
  {let newItem = new newList({
    name: req.body.new
  });
  newItem.save();
  items=[];
  newList.find({},function(err,docs){
    if(err){
      console.log(err);
    }else{
      docs.forEach(function(log) {
        items.push(log.name);
      });
    }
  });
  items.push(newItem.name);
  res.redirect(path);}
})