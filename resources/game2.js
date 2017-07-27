function setup(){
  $('body').keydown(whileMoving);
  $('body').keyup(whileStatic);
  console.log('help');
  $("#item1").click(useItem);
  $("#item2").click(useItem);
  $("#item3").click(useItem);
  $("#fight").click(beginFight);
  $("#magic").click(magicAttack);
}

var isFirst = true;
var s = 0;
var d = 0;

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
  console.log(potion.text());
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

function getCheckpoint(){
  return Number($('#checkpoint').text())
}

function createEnemy(){
  var attack = Math.round(Math.random() * 5 + 20);
  var speed = Math.round(Math.random() * 5 + 8);
  Enemy = [];
  Enemy.push("Boss", 2000, attack, speed);
  $('#enemyH').text(Enemy[1]);
}

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
      $("#character").animate({marginTop: (s - 10)}, 50);
      s -= 10;

    }
    else if(e.which == 65){
      if (isFirst){
        $("#character").attr('src', "../resources/walkingleft.gif");
        isFirst = false;
      }
      $("#character").animate({marginLeft: (d - 10)}, 50);
      d -= 10;
    } //a
    else if(e.which == 83){
      if (isFirst){
        $("#character").attr('src', "../resources/walkingdown.gif");
        isFirst = false;
      }

      $("#character").animate({marginTop: (s + 10)}, 50);
      s += 10;
    } //s
    else if(e.which == 68){
      if (isFirst){
        $("#character").attr('src', "../resources/walkingright.gif");
        isFirst = false;
      }
      $("#character").animate({marginLeft: (d + 10)}, 50);
      d += 10;
    }//d
  }
  if(s >= 100 && d >= 100){
    battle();
  }
}

function whileStatic(e){
  isFirst = true;
  $("#character").attr('src', "../resources/walkdown1.png");
}

function beginAnimateBattle(){
  $('#character').css({height: "183px", width: "189px"});
  $("#enemy").css({height: "183px", width: "130px"});
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

  createEnemy();
}

function enemyFastAttack(){
  $("#enemy").attr('src', "../resources/bonesattack.gif");

  setTimeout(function(){
    enemyGoBack();
    meAttackGif();
  }, 1100);
}

function enemyFastMagic(){
  $("#enemy").attr('src', "../resources/bonesattack.gif");

  setTimeout(function(){
    enemyGoBack();
    meMagicGif();
  }, 1100);
}


function enemyAttack(){
  $("#enemy").attr('src', "../resources/seemong.gif");

  setTimeout(function(){
    enemyGoBack();
  }, 1500);

}

function enemyGoBack(){
  $("#enemy").attr('src', "../resources/seemong.jpg");
}

function meAttackGif(){
  $("#character").attr('src', "../resources/swordattack.gif");

    setTimeout(function(){
      goBack();
    }, 1100);

}

function meMagicGif(){
  $("#character").attr('src', "../resources/MagicFight.gif");

    setTimeout(function(){
      goBack();
    }, 1100);

}

function meFastGif(){
  $("#character").attr('src', "../resources/swordattack.gif");

    setTimeout(function(){
      goBack();
      enemyAttack();
    }, 1100);

}

function fastMagicGif(){
  $("#character").attr('src', "../resources/MagicFight.gif");

    setTimeout(function(){
      goBack();
      enemyAttack();
    }, 1100);

}

function goBack(){
    $("#character").delay(800).attr('src', "../resources/walkdown1.png");
}

function beginFight(e){
  if(getSpeed() > Enemy[3]){
    meFastGif();
    Enemy[1] -= getAttack();
    $('#enemyH').text(Enemy[1]);
    if(Enemy[1] <= 0){
      gainExp();
      state = 0;
      $(".battle_screen").css({display:"none"});
      if(state == 0){
        $('html').fadeOut(endAnimateBattle);
        endGame();
      return;
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
    enemyFastAttack();
    Enemy[1] -= getAttack();
    $('#enemyH').text(Enemy[1]);
    if(Enemy[1] <= 0){
      gainExp();
      state = 0;
      $(".battle_screen").css({display:"none"});
      if(state == 0){
        $('html').fadeOut(endAnimateBattle);
        endGame();
      }
    }
  }

//window.location.href = "/"

}

function magicAttack(e){
  var multi = Math.round(Math.random() * 4 + 0.5)
  if(getSpeed() > Enemy[3]){
    fastMagicGif();
    Enemy[1] -= getMagic() * multi;
    $('#enemyH').text(Enemy[1]);
    if(Enemy[1] <= 0){
      gainExp();
      state = 0;
      $('.battle_screen').css({display: "none"});
      $('html').fadeOut(endAnimateBattle);
      endGame();
      return;
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
    $('#enemyH').text(Enemy[1]);
    enemyFastMagic();
    if(Enemy[1] <= 0){
      gainExp();
      state = 0;
      $('.battle_screen').css({display: "none"});
      $('html').fadeOut(endAnimateBattle);
      endGame();
    }
  }
}

function endGame(){
  $('#Victory').text("You Win!!!");
  setTimeout(function(){
    window.location.href = "/";
  }, 5000);

}
function gainExp(){
  console.log("content of enemy" + Enemy);
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
