exports.getDate = function (){
let today = new Date();
let dayNum = today.getDay();
let day = "";
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
return today;
}
exports.getDay= function (){
let today = new Date();
let dayNum = today.getDay();
let day = "";
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
today = day;
return today;
}
