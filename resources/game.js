
function setup(){
  $('body').keydown(whileMoving);
  $('body').keyup(whileStatic);
  console.log('help');
}



var isFirst = true;
var s = 0;
var d = 0;
var enemyEncounter;


function getHealth(){
  return Number($('#health').text());
}

function getAttack(){
  return Number($('#attack').text());
}

function getMagic(){
  return Number($('#magicA').text());
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
  return Number($('#expNeeded').text());
}

function getSpeed(){
  return Number($('#speed').text());
}

function createEnemy(){
  var attack = Math.round(Math.random() * 5 + 2);
  var speed = Math.round(Math.random() * 5 + 8);
  Enemy.push("Bones", 20, attack, speed);
}

//states will be used to stop funtion whileMoving to work
var Enemy = [];
var state = 0;
function whileMoving(e){
  if(state == 0){
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
  createEnemy();

}

function beginFight(e){
  if(getSpeed() > Enemy[3]){
    Enemy[1] -= getAttack();
    if(Enemy[1] <= 0){
      state = 0;
      $(".battle_screen").css({display:"none"});
    }
    var newHealth = getHealth() - Enemy[2];
    if(newHealth <= 0){
      newHealth = 0;
      $('#health').text(newHealth);
      window.location.href = "/"
    }
    $('#health').text(newHealth);
  }
  else{
    var newHealth = getHealth() - Enemy[2];
    if(newHealth <= 0){
      newHealth = 0;
      $('#health').text(newHealth);
      window.location.href = "/"
    }
    $('#health').text(newHealth);
    Enemy[1] -= getAttack();
    if(Enemy[1] <= 0){
      state = 0;
      $(".battle_screen").css({display:"none"});
    }
  }

//window.location.href = "/"

}

function magicAttack(e){
  var multi = Math.round(Math.random() * 4 + 0.5)
  if(getSpeed() > Enemy[3]){
    Enemy[1] -= getMagic() * multi;
    $('#damage').text((getMagic() * multi))
    if(Enemy[1] <= 0){
      state = 0;
      $(".battle_screen").css({display:"none"});
    }
    var newHealth = getHealth() - Enemy[2];
    if(newHealth <= 0){
      newHealth = 0;
      $('#health').text(newHealth);
      window.location.href = "/"
    }
    $('#health').text(newHealth);
  }
  else{
    var newHealth = getHealth() - Enemy[2];
    if(newHealth <= 0){
      newHealth = 0;
      $('#health').text(newHealth);
      window.location.href = "/"
    }
    $('#health').text(newHealth);
    Enemy[1] -= getMagic() * multi;
    $('#damage').text((getMagic() * multi))
    if(Enemy[1] <= 0){
      state = 0;
      $(".battle_screen").css({display:"none"});
    }
}
}

function tryToEscape(e){
  var escape = Math.random();
    if((escape * 101) > 40){
    state = 0;
    $(".battle_screen").css({display: "none",});
    }

}

function battleContinues(){

}
$(document).ready(setup);
