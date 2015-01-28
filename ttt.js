// window.onload = function () {
// 	confirm("Let's play!");
// 	var xOro = prompt("You want to be X's or O's?");

// 		if(xOro == "O" || xOro == "o") {
// 			alert("Fine. Whatever. I wanted to be X's anyway.");
// 		}

// 		else if(xOro=="X" || xOro == "x") {
// 			alert("Sweet! O's are the best! O's! O's! O's!");
// 		}

// 		else {
// 			alert("That's not even a choice. Seriously, have you never played this game before? Do you live in a cave or something?");
// 		}

// 	var flip = function() {
// 		var playerFlip = prompt("Click the quarter to see who goes first. \n Do you want to be Heads or Tails?");
// 		// // coin flip
// 		document.getElementById("quarter").onclick=function() {

// 			var coinFlip = Math.random();
// 			// pause coin flip to call it (setTimeout,) create box that says "call it" click "heads" or "tails"
				
// 				if ((coinFlip >= 0) && (coinFlip <= .5)) {
// 					var coinFlip = "Heads";
// 			    	alert("It's heads.")
// 				}

// 				else {
// 					var coinFlip = "Tails";
// 					alert("It's tails.")
// 				}
// 					if (playerFlip == coinFlip) {
// 						alert("You first. Hit me with your best shot.")
// 					}

// 					else {
// 						alert("Me first. I'm going to rock your world.")
// 					}
					
// 			};
// 		};
// 	flip();

// };
var app = angular.module('angularInputsApp', []);

app.controller('angularInputsCtrl', function($scope){
	// alert("yes, I'm alive!")
	$scope.board = [["", "", ""], ["", "", ""], ["", "", ""]];
	
	$scope.game = {board: [1, 2, 3, 4, 5, 6, 7, 8, 9], p1: "X", p2: "O"};
	
	function winConditions(piece){
        for(var i = 0; i < 3; i++){
            if($scope.board[i][0] == $scope.board[i][1] && $scope.board[i][0] == $scope.board[i][2] && $scope.board[i][0] != ""){
                alert(piece + " wins in the row " + i);
            }
            else if($scope.board[0][i] == $scope.board[1][i] && $scope.board[0][i] == $scope.board[2][i] && $scope.board[0][i] != ""){
                alert(piece + " wins in the row " + i);
            }
        }
        if($scope.board[0][0] == $scope.board[1][1] && $scope.board[0][0] == $scope.board[2][2] && $scope.board[0][0] != ""){
                alert(piece + " wins in the row " + i);
        }
    }	

    $scope.turnNum = 0;
	$scope.makeMove = function(row,column) {
		if($scope.board[row][column] == "") {
		// turn counter
			var piece = ($scope.turnNum % 2) == 0 ? "X" : "O";
			$scope.board[row][column] = piece;
			$scope.turnNum++;
			winConditions(piece);
		}
	};
});












