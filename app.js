const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.set('view engine', 'ejs');
app.listen(3000, function() {
  console.log("service has started on port 3000");
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
let today = new Date();
let dayNum = today.getDay();
let day = "";
let items=[];
options = {
  day:"2-digit" ,
  month:"long" ,
  year:"numeric"
}
today = today.toLocaleDateString("en-US", options);

switch (dayNum) {
  case 0:
    day = "sunday";
    break;
  case 1:
    day = "monday";
    break;
  case 2:
    day = "tuesday";
    break;
  case 3:
    day = "wednsday";
    break;
  case 4:
    day = "thursday";
    break;
  case 5:
    day = "friday";
    break;
  case 6:
    day = "saturday";
    break;
  default:
    console.log("the num entered switch is :" + dayNum);
}
today = day+" "+today;

app.get("/", function(req, res) {
  let loops=items.length;
  res.render("lists", {
    kindOfDay: today ,
    newItem: items,
    loops:loops
  });
})
app.post("/", function(req, res) {
  let newItem = req.body.new;
  items.push(newItem);
  res.redirect("/")
})
