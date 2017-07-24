var canvas = document.getElementById("room");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);

function setup(){
  $('body').keydown(whileMoving);
  $('body').keyup(whileMoving);
}

function whileMoving(e){
  console.log(e.currentTarget)
}

$(document).ready(setup);
