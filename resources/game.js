
function setup(){
  $('#health').text("hi");
  $('body').keydown(whileMoving);
  $('body').keyup(whileStatic);
  console.log('help');
}



var isFirst = true;
var s = 0;
var d = 0;
var enemyEncounter;


function getHealth(){
  return $('#health').text();
}

function getAttack(){
  return $('#attack').text();
}

function getMagic(){
  return $('#magic').text();
}

function getItem1(){
  return $('#item1').text();
}

function getItem2(){
  return $('#item1').text();
}

function getItem3(){
  return $('#item1').text();
}

function getExp(){
  return $('#exp').text();
}

function getExpNeeded(){
  return $('#expNeeded').text();
}

function getSpeed(){
  return $('#speed').text();
}

//states will be used to stop funtion whileMoving to work
var state = 0;
function whileMoving(e){
  if (state == 0){
    var num = e.which;

    console.log(num + 'why ' + getHealth());
    if(e.which == 87){ //w
      if (isFirst){
        $("#character").attr('src', "../resources/walkingup.gif");
        isFirst = false;
      }
      if((Math.random() * 101) < 10){
        console.log("Enemy found!")
      }
      $("#character").animate({marginTop: (s - 10)}, 50);
      s -= 10;

    }
    else if(e.which == 65){
      if (isFirst){
        $("#character").attr('src', "../resources/walkingleft.gif");
        isFirst = false;
      }
      if((Math.random() * 101) < 10){
        console.log("Enemy found!")
      }
      $("#character").animate({marginLeft: (d - 10)}, 50);
      d -= 10;
    } //a
    else if(e.which == 83){
      if (isFirst){
        $("#character").attr('src', "../resources/walkingdown.gif");
        isFirst = false;
      }
      if((Math.random() * 101) < 10){
        console.log("Enemy found!");
        battle();
      }
      $("#character").animate({marginTop: (s + 10)}, 50);
      s += 10;
    } //s
    else if(e.which == 68){
      if (isFirst){
        $("#character").attr('src', "../resources/walkingright.gif");
        isFirst = false;
      }
      if((Math.random() * 101) < 10){
        console.log("Enemy found!")
      }
      $("#character").animate({marginLeft: (d + 10)}, 50);
      d += 10;
    }//d
  }
}
}

function whileStatic(e){
  isFirst = true;
  $("#character").attr('src', "../resources/walkdown1.png");
}

function battle(){
  state = 1;
  $(".battle_screen").css({display: "inline-block",});
  $("#character").css({marginLeft: "40%",});
  $("#fight").click(beginFight);
  $("#magic").click(magicAttack);
  $("#escape").click(tryToEscape);

}

function beginFight(e){

}

function magicAttack(e){

}

function tryToEscape(e){

}

function battleContinues(){
  if()
}
$(document).ready(setup);
