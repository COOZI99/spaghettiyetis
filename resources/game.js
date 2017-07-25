
function setup(){
  $('body').keydown(whileMoving);
  $('body').keyup(whileStatic);
  console.log('help');
}

function whileMoving(e){
  var num = e.which;
  console.log(num + 'why');
  if(e.which == 87){ //w

  }
  else if(e.which == 65){

  } //a
  else if(e.which == 83){

  } //s
  else if(e.which == 68){

  }//d
}

function whileStatic(e){

}
$(document).ready(setup);
