// this registers firebase as a module in the app
// var app = angular.module("angularInputsApp", ["firebase"]);
// injects firebase into any controller
(function(){
	angular
		.module('angularInputsApp')
		.controller('angularInputsController', angularInputsController);


	function angularInputsController(){
		// Capture variable self
		var self = this;
		// firebase reference - I need this b/c it makes sense in my heart
		var fireRef = new Firebase("https://denisettt.firebaseio.com/board");
		var gameSync = $firebase(fireRef);
		self.TicTacToe = TicTacToeSync.$asObject();
		// turn counter
		self.tictactoe.turnCounter = 0;
		// players
		self.TicTacToe.players = [];
		// wins
		self.TicTacToe.wins = [];
		// Number of tiles in TicTacToe (CONST)
		var NUMTILES = 9;
		// game has loaded 
		self.TicTacToe.$loaded(function(){
		// this is creating my.tictactoe board as an array in an object
			self.TicTacToe.board = [];
		
			for(var i=1; i <= NUMTILES; i++){
				self.TicTacToe.board[i] = "";
			}

		});

		self.makeMove = function(index){
		// checking where player has moved
		if(self.board[index].playerMove === "") {
		// turn counter & assigns x and o - checking in the counter array's index for the turn
			var piece = ($scope.counter[0].turn % 2) === 0 ? "X" : "O";
			$scope.board[index].playerMove = piece;
			$scope.board.$save($scope.board[index]);
			// this makes it so the right person goes at the right time
			$scope.counter[0].turn++;
			$scope.counter.$save(0);
			// winConditions(piece);
			console.log("eat it3");
		}
	};	
	
		self.winConditions = function(piece){
        for(var i = 0; i < 3; i++){
            if(self.board[i][0] == self.board[i][1] &&self.board[i][0] ==self.board[i][2] &&self.board[i][0] !== ""){
                alert(piece + " wins in the row " + i);
            }
            else if($scope.board[0][i] ==self.board[1][i] &&self.board[0][i] ==self.board[2][i] &&self.board[0][i] !== ""){
                alert(piece + " wins in the row " + i);
            }
        }
        if($scope.board[0][0] ==self.board[1][1] &&self.board[0][0] ==self.board[2][2] &&self.board[0][0] !== ""){
                alert(piece + " wins in the row " + i);
        }
    };		
})();