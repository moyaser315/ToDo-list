const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const day=require(__dirname+"/day.js");
app.set('view engine', 'ejs');
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
  let loops=items.length;
  res.render("lists", {
    kindOfDay: today ,
    newItem: items,
    loops:loops
  });
})
app.post("/", function(req, res) {
  let newItem = req.body.new
  if(req.body.button=="work"){
    workList.push(newItem);
    res.redirect("/work");
  }else{
    items.push(newItem);
    res.redirect("/");
  }

})
app.get("/work",function(req,res){
  let loops=workList.length;
  res.render("lists",{kindOfDay:"work list", newItem: workList,
  loops:loops})
})
app.post("/work",function(req,res){
  workList.push(req.body.new);
  res.redirect("/work");
})
app.get("/about",function(req,res){
  res.render("about");
})
