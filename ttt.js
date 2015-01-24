window.onload = function () {
	confirm("Let's play!");
	var xOro = prompt("You want to be X's or O's?");

		if(xOro == "O" || xOro == "o") {
			alert("Fine. Whatever. I wanted to be X's anyway.");
		}

		else if(xOro=="X" || xOro == "x") {
			alert("Sweet! O's are the best! O's! O's! O's");
		}

		else {
			alert("That's not even a choice. Seriously, have you never played this game before? Do you live in a cave or something?");
		}

	var coinFlip = prompt("Let's flip to see who goes first. \n Do you want to be Heads or Tails?");
	

	// coin flip
	document.getElementById("quarter").onclick=function() {
	   
    var rand = Math.floor(Math.random()*2);


    	if(rand == coinFlip) {
    		alert("You go first");
	   }
	   else	if (rand != coinFlip) {
	   	alert("Me first");
	   }
};


}	

    	if(rand == 0) && ({
    		alert("Heads");
	   }
	   else {
	   	alert("Tails");
	   }
};
