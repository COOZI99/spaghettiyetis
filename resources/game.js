
function setup(){
  $('body').keydown(whileMoving);
  $('body').keyup(whileStatic);
  console.log('help');
}

var s = 0;
var d = 0;
var enemyEncounter;
function whileMoving(e){
  var num = e.which;
  console.log(num + 'why');
  if(e.which == 87){ //w
    if((Math.random() * 101) < 10){
      console.log("Enemy found!")
    }
    $("#character").animate({marginTop: (s - 10)}, 50);
    s -= 10;
  }
  else if(e.which == 65){
    if((Math.random() * 101) < 10){
      console.log("Enemy found!")
      $(".")
    }
    $("#character").animate({marginLeft: (d - 10)}, 50);
    d -= 10;
  } //a
  else if(e.which == 83){
    if((Math.random() * 101) < 10){
      console.log("Enemy found!");
      battle();
    }
    $("#character").animate({marginTop: (s + 10)}, 50);
    s += 10;
  } //s
  else if(e.which == 68){
    if((Math.random() * 101) < 10){
      console.log("Enemy found!")
    }
    $("#character").animate({marginLeft: (d + 10)}, 50);
    d += 10;
  }//d
}

function whileStatic(e){

}

function battle(){
  $(".battle_screen").css({display: "flex"});
}
$(document).ready(setup);
