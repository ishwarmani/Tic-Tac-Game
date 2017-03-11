var flag = true;
var matrix = new Array(4);
createArray();
$(document).ready(function () {
  var str ;
  var idr ;
  //dynamically creating rows in table
  //depending on size of matrix.
  for(var i = 0; i < matrix.length; i++){
    str+= "<tr>"
    for(var j = 0; j < matrix.length; j++) {
      idr = i + "" + j;
      str += "<td sytle='color:red' class='text-center' id = '" + idr + "'>G</td>";
    }
    str+= "</tr>"
  }
  $("#TTtable").append(str);
  $("#turner").html("Player 1's(0) turn")

  //this function is called when any of
  //td of table is clicked
  $("td").click(function () {
    var id = $(this).attr('id');
    //flag is used to see whether match is already
    //over or not.
    if(flag){
      check(id);
      if(pos == matrix.length*matrix.length + 1){
        printMsg("Match is drawn","black");
        $("#turner").html("");
      }
    }
    else{
      $("#turner").html("Game is alreay up");
    }
  })
  //making width and height equal
  //for every box.
  var cw = $('td').width();
  $('td').css({
    'height': cw + 'px'
  });
});

//function to create array according to number of boxes are
//required in table. And entering default values in it.
function createArray() {
  for (var i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(matrix.length);
  }
  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix.length; j++) {
      matrix[i][j] = 0;
    }
  }
}

//this function checks whether player has clicked in empty
//box or not.if yes then play function is called.
function check(id) {
  if($('#'+id).html() == "G"){
    $("#prompter").html("")
    play(id);
  }else{
    $("#prompter").html("try in empty box")
  }
}
var pos = 1;
var x,y;

//this function makes changes in matrix according to
//the player who has his/her turn.
function play(id) {
  x = id[0];
  y = id[1];
  if(pos % 2 != 0 )  {
    $("#"+id).html("O");
    $("#"+id).css("color","white")
    matrix[x][y] = 1;
    $("#turner").html("Player 2's(X) turn");
    if(winnerChecker(x,y,1)){
      printMsg("Player 1(O) wins","green")
      $("#turner").html("")
      flag = false;
    }
  }
  else {
    $("#"+id).html("X");
    $("#"+id).css("color","white")
    matrix[x][y] = 2;
    $("#turner").html("Player 1's(O) turn");
    if(winnerChecker(x,y,2)){
      printMsg("Player 2(X) wins","green")
      $("#turner").html("")
      flag = false;
    }
  }
  pos++;
}

//this function takes x,y the coordinates where player
//clicked and rteurns true if player passed is winner
//else returns false;
function winnerChecker(x,y,player) {
  var col,row,diag,adiag;
  col = 0;row = 0;diag = 0;adiag = 0;
  winner = false;
  var len = matrix.length;
  for (var i = 0; i < matrix.length; i++) {
    if(matrix[x][i] == player)
    col++;
    if(matrix[i][y] == player)
    row++;
    if(matrix[i][i] == player)
    diag++;
    if(matrix[i][len - i - 1])
    adiag++;
  }

  if(row == len || col == len || diag == len || adiag == len){
    winner = true;
  }
  return winner;

}

//this function prints the message whether Match
//is drawn or won by player 1 or player 2.
function printMsg(msg,color){
  console.log(msg,color)
  $("#msg").html(msg);
  $("#msg").css("background-color",color);
}
