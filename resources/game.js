
function setup(){
  $('body').keydown(whileMoving);
  $('body').keyup(whileStatic);
  console.log('help');
  $("#item1").click(useItem)
  $("#item2").click(useItem)
  $("#item2").click(useItem)
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

function useItem(){
  var newHealth = getHealth() + 30;
  $('#health').html(newHealth + '<input type = "hidden" name = "hp" value=' + newHealth + '>');
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
    var right = $('body').width() - d;
    var cabinR = 100;
    var top = s;
    var cabinT = 50;
    if(right <= cabinR && top <= cabinT){
      if($(location).attr('href') == "http://localhost:8080/game1?username=" +
          $('#username').val() + "&password=" + $('#password').val()){
            $('#checkpoint').html(2 + '<input type = "hidden" name = "checkpoint" value=' + 2 + '>');
          }
      $('form').submit();
    }
    var right = $('body').width() - d;
    var doorR = 100;
    var doorT = $('body').height() - 386;
    var top = s;
    //console.log("right=" + right + " ,top= " + top);
    if(right <= doorR && top >= doorT){
      window.location.href = "/game1?username=" + $('#username').val() + "&password=" + $('#password').val();
    }

  }




function whileStatic(e){
  isFirst = true;
  $("#character").attr('src', "../resources/walkdown1.png");
}
function animateBattle(){
  $("#character").css({height: "25%", width: "25%"});
  $("#enemy").css({height: "150%", width: "150%"});
  $(".battle_screen").css({display: "inline-block",});
  $("#character").css({marginLeft: "40%",});
  $("html").fadeIn();
}

function battle(){
  state = 1;
  $("html").fadeOut(animateBattle);
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
      if(state == 0){
        $("#character").css({marginLeft: d});
      }

    }
    var newHealth = getHealth() - Enemy[2];
    if(newHealth <= 0){
      newHealth = 0;
      $('#health').html(newHealth + '<input type = "hidden" name = "hp" value=' + newHealth + '>');
      window.location.href = "/"
    }
    $('#health').html(newHealth + '<input type = "hidden" name = "hp" value=' + newHealth + '>');
  }
  else{
    var newHealth = getHealth() - Enemy[2];
    if(newHealth <= 0){
      newHealth = 0;
      $('#health').html(newHealth + '<input type = "hidden" name = "hp" value=' + newHealth + '>');
      window.location.href = "/"
    }
    $('#health').html(newHealth + '<input type = "hidden" name = "hp" value=' + newHealth + '>');
    Enemy[1] -= getAttack();
    if(Enemy[1] <= 0){
      state = 0;
      $(".battle_screen").css({display:"none"});
      if(state == 0){
        $("#character").css({marginLeft: d});
      }
    }
  }

//window.location.href = "/"

}

function magicAttack(e){
  var multi = Math.round(Math.random() * 4 + 0.5)
  if(getSpeed() > Enemy[3]){
    Enemy[1] -= getMagic() * multi;
    if(Enemy[1] <= 0){
      state = 0;
      $(".battle_screen").css({display:"none"});
    }
    var newHealth = getHealth() - Enemy[2];
    if(newHealth <= 0){
      newHealth = 0;
      $('#health').html(newHealth + '<input type = "hidden" name = "hp" value=' + newHealth + '>');
      window.location.href = "/"
    }
    $('#health').html(newHealth + '<input type = "hidden" name = "hp" value=' + newHealth + '>');
  }
  else{
    var newHealth = getHealth() - Enemy[2];
    if(newHealth <= 0){
      newHealth = 0;
      $('#health').html(newHealth + '<input type = "hidden" name = "hp" value=' + newHealth + '>');
      window.location.href = "/"
    }
    $('#health').html(newHealth + '<input type = "hidden" name = "hp" value=' + newHealth + '>');
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
      if(state == 0){
        $("#character").css({marginLeft: d});
      }

    }

}

$(document).ready(setup);
