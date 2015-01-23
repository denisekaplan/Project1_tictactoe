// var x = "X"
// var o = "O"
// var count = 0;
// var o_win = 0;
// var x_win = 0;
window.onload = function () {
	confirm("Let's play!");
	var xOro = prompt("You want to be X or O?");
		if(xOro = "x") 
		{
			alert("Fine. Whatever. I wanted to be O anyway.");
		}
		else {
			alert("Sweet! X is the best!");
		}

	var coinFlip = prompt("Flip the coin to see who goes first. \n Heads or Tails?");
	
	// coin flip
	document.getElementById("quarter").onclick=function() {
	    alert((Math.floor(Math.random() * 2) == 0) ? "Heads" : "Tails");
	   };

	   // if coinFlip = (Math.floor(Math.random() * 2) == 0) {
	   // 	alert("You go first");
	   // }
	   // else	{
	   // 	alert("Me first");
	   // 	}

}	