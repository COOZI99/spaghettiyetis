
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

function useItem(e){
  var potion = $(e.currentTarget);
  var newHealth = getHealth() + 30;
  console.log('No');
  if(potion.text() == " potion"){
  if(newHealth >= getMaxHealth()){
    console.log('help');
    $('#health').html(getMaxHealth() + '<input type = "hidden" name = "hp" value=' + getMaxHealth() + '>');
    potion.html('---------- <input type = "hidden" name =' + potion.attr('id') + ' value=---------->');
    }
    else{
      $('#health').html(newHealth + '<input type = "hidden" name = "hp" value=' + newHealth + '>');
      potion.html('---------- <input type = "hidden" name =' + potion.attr('id') + ' value=---------->');
    }
  }
}



function getExp(){
  return Number($('#exp').text());
}

function getExpNeeded(){
  return Number($('#expNeeded').text());
}

function getSpeed(){
  return Number($('#speed').text());
}

function getLevel(){
  return Number($('#level').text());
}

function getMaxHealth(){
  return Number($('#maxHealth').text());
}

function createEnemy(){
  var attack = Math.round(Math.random() * 5 + 2);
  var speed = Math.round(Math.random() * 5 + 8);
  Enemy = [];
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

function beginAnimateBattle(){
  $('#character').css({height: "183px", width: "189px"});
  $("#enemy").css({height: "183px", width: "150px"});
  $(".battle_screen").css({display: "inline-block",});
  $('#character').css({marginLeft: '30%'});
  $('html').fadeIn();
}

function endAnimateBattle(){
  console.log('fade In');
  $('#character').css({height: '61px', width: '63px'});
  $('#character').css({marginLeft: d});
  $('html').fadeIn();
}
function battle(){
  state = 1;
  $('html').fadeOut(beginAnimateBattle);
  $("#fight").click(beginFight);
  $("#magic").click(magicAttack);
  $("#escape").click(tryToEscape);
  createEnemy();
}

function beginFight(e){
  if(getSpeed() > Enemy[3]){
    Enemy[1] -= getAttack();
    if(Enemy[1] <= 0){
      gainExp();
      state = 0;
      $(".battle_screen").css({display:"none"});
      if(state == 0){
        $('html').fadeOut(endAnimateBattle);
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
      gainExp();
      state = 0;
      $(".battle_screen").css({display:"none"});
      if(state == 0){
        $('html').fadeOut(endAnimateBattle);
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
      gainExp();
      state = 0;
      $('.battle_screen').css({display: "none"});
      $('html').fadeOut(endAnimateBattle);
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
      gainExp();
      state = 0;
      $('.battle_screen').css({display: "none"});
      $('html').fadeOut(endAnimateBattle);
    }
  }
}

function tryToEscape(e){
  var escape = Math.random();
    if((escape * 101) > 40){
    state = 0;
    $(".battle_screen").css({display: "none",});
      if(state == 0){
        $('html').fadeOut(endAnimateBattle);
      }

    }
}

function gainExp(){
  var ex = getExp() + 10;
  $('#exp').html(ex + '<input type = "hidden" name="experience" value=' + ex + '>');
  if(getExp() >= getExpNeeded()){
    var level = getLevel() + 1;
    var attack = getAttack() + 5;
    var magic = getMagic() + 1;
    var maxHealth = getMaxHealth() + 10;
    var health = getMaxHealth() + 10;
    var speed = getSpeed() + 5;
    $('#level').html(level + '<input type = "hidden" name="level" value=' + level + '>');
    $('#attack').html(attack + '<input type = "hidden" name="attack" value=' + attack + '>');
    $('#magicA').html(magic + '<input type = "hidden" name="magicA" value=' + magic + '>');
    $('#speed').html(speed + '<input type = "hidden" name="speed" value=' + speed + '>');
    $('#health').html(health + '<input type = "hidden" name="health" value=' + health + '>');
    $('#maxHealth').html(maxHealth + '<input type = "hidden" name="maxHp" value=' + maxHealth + '>');
    var newNeed = getExpNeeded() + 10 * level;
    $('#expNeeded').html(newNeed + '<input type = "hidden" name="expNeeded" value=' + newNeed + '>');
  }
}

$(document).ready(setup);
//I Changed some stuff
