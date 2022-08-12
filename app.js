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
const WorkItem = mongoose.model("workList", itemsScheme);
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




//////////////////                            start logic here
let items = [];
let workList = []
let today = day.getDay();
/////////////       always displayed
const work = new Item({
  name: "work"
});
const play = new Item({
  name: "play"
});
const study = new Item({
  name: "study"
});
Item.find({}, function(err, docs) {
  if (err) {
    console.log(err);
  } else {
    docs.forEach(function(log) {
      items.push(log.name);
    });
  }
});


app.get("/", function(req, res) {
  let loops = items.length;
  res.render("lists", {
    kindOfDay: today,
    newItem: items,
    loops: loops
  });
})
app.post("/", function(req, res) {
  let newItem = new Item({
    name: req.body.new
  });
  let newWItem = new WorkItem({
    name: req.body.new
  });
  if (req.body.button == "work") {
    newWItem.save();
    workList.push(newWItem.name);
    res.redirect("/work");
  } else {
    newItem.save();
    items.push(newItem.name);
    res.redirect("/");
  }
})
app.get("/work", function(req, res) {
  let loops = workList.length;
  res.render("lists", {
    kindOfDay: "work list",
    newItem: workList,
    loops: loops
  })
})
app.post("/work", function(req, res) {
  workList.push(req.body.new);
  res.redirect("/work");
})
app.get("/about", function(req, res) {
  res.render("about");
})
app.post("/delete",function(req,res){
  let x =req.body.check;
  let index=items.indexOf(x);
  items.splice(index,1);
  Item.deleteOne({name:x},function(err){console.log(err);})
  res.redirect("/");
})