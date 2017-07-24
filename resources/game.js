
var canvas = document.getElementById("room");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 150, 75);

function setup(){
  $('body').keydown(whileMoving);
  $('body').keyup(whileStatic);
}

function whileMoving(e){
  console.log(e.which);
}

$(document).ready(setup);
