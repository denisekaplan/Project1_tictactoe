// function(){
	// this regiaters firebase as a dependecy in the app
	var app = angular.module('gameApp', ['firebase']);

	app.controller("gameController", function($scope, $firebase){
		  
		  // firebase reference - I need this b/c it makes sense in my heart
		  // var fireRef = new $window.Firebase("https://denisetictactoe.firebaseio.com/");
		  
		  // creates a reference to the board
		  var boardRef = new Firebase("https://denisetictactoe.firebaseio.com/board");
		  var boardSync = $firebase(boardRef);
		  $scope.board = boardSync.$asArray();

		  // firebase turn counter working with the players determines whose turn it is
		  var countRef = new Firebase("https://denisetictactoe.firebaseio.com/counter");
		  var countSync = $firebase(countRef);
	 	  $scope.counter = countSync.$asArray();

		  // firebase players stuff - working with the turn counter determines whose turn it is
		  var playerRef = new Firebase("https://denisetictactoe.firebaseio.com/players");
		  var playerSync = $firebase(playerRef);
		  $scope.players = playerSync.$asArray();

		  // firebase winMessage stuff
		  var winRef = new Firebase("https://denisetictactoe.firebaseio.com/winMessage");
		  var winSync = $firebase(winRef);
		  $scope.winMessage = winSync.$asArray();

		 	// Big ups to Sam for explaining this whole firebase business
		 	// this makes the board
		    $scope.board.$loaded(function(){
				if($scope.board.length === 0){
					for(var i = 0; i < 9; i++){
						$scope.board.$add({playerMove: ""});
					}
				}
				else{
					for(var i = 0; i < 9; i++){
						$scope.board[i].playerMove = "";
						$scope.board.$save(i);
					}
				}
			});
		 
		 	// .length checking to see if a game has started, if it's 0, it hasn't been.
		    $scope.counter.$loaded(function(){
				if($scope.counter.length === 0){
					$scope.counter.$add({turn: 0});
				}
				// if less than 0, means the game is over and it resets and starts the game over
				else if($scope.counter[0].turn < 0){
					$scope.counter[0].turn = 0;
					$scope.counter.$save(0);
				}
				// sets the turn to 0 on page refresh
				else{
					$scope.counter[0].turn = 0;
					$scope.counter.$save(0);
				}
			});
		 	// Sam help not entirely sure - this was part of the stuff I had to rebuild at the last minute
		    $scope.winMessage.$loaded(function(){
				if($scope.winMessage.length === 0){
					$scope.winMessage.$add({message: "Make a move and get this show on the road!"});
				}
				else{
					$scope.winMessage[0].message = "Make a move and get this show on the road!";
					$scope.winMessage.$save(0);
				}
			});
		 	// Sam help not entirely sure - this was part of the stuff I had to rebuild at the last minute
			$scope.players.$loaded(function(){
				if($scope.players.length === 0){
					$scope.players.$add({playerOne: false, playerTwo: true});
				}
				else{
					$scope.players[0].playerOne = false;
					$scope.players[0].playerTwo = true;
					$scope.players.$save(0);
				}
			});		 
		 	
			$scope.makeMove = function(index){
				if($scope.counter[0].turn === 0){
					$scope.players[0].playerOne = true;
					$scope.players[0].playerTwo = false;
				}
				if(($scope.board[index].playerMove !== "X") && ($scope.board[index].playerMove !== "O") && ($scope.counter[0].turn >= 0)){
					if((($scope.counter[0].turn % 2) === 0) && ($scope.players[0].playerOne === true)){
						var piece = "X";
						$scope.board[index].playerMove = piece;
						$scope.board.$save($scope.board[index]);
						$scope.counter[0].turn++;
						$scope.counter.$save(0);
						$scope.winMessage[0].message = "Player Two is up";
						$scope.winMessage.$save(0);
					}

					else if((($scope.counter[0].turn % 2) === 1) && ($scope.players[0].playerTwo === true)){
						var piece = "O";
						$scope.board[index].playerMove = piece;
						$scope.board.$save($scope.board[index]);
						$scope.counter[0].turn++;
						$scope.counter.$save(0);
						$scope.winMessage[0].message = "Player One is up";
						$scope.winMessage.$save(0);
					}
					
					if($scope.counter[0].turn >= 5){
						winConditions(piece);
					}
				}
			};
		 
		 	// win conditions - if these combinations of are occupied by a player, a winner is declared
			function winConditions(player){
				if((($scope.board[0].playerMove == $scope.board[1].playerMove) && ($scope.board[0].playerMove == $scope.board[2].playerMove) && ($scope.board[0].playerMove !== "")) ||
					(($scope.board[3].playerMove == $scope.board[4].playerMove) && ($scope.board[3].playerMove == $scope.board[5].playerMove) && ($scope.board[3].playerMove !== "")) ||
					(($scope.board[6].playerMove == $scope.board[7].playerMove) && ($scope.board[6].playerMove == $scope.board[8].playerMove) && ($scope.board[6].playerMove !== "")) ||
					(($scope.board[0].playerMove == $scope.board[3].playerMove) && ($scope.board[0].playerMove == $scope.board[6].playerMove) && ($scope.board[0].playerMove !== "")) ||
					(($scope.board[1].playerMove == $scope.board[4].playerMove) && ($scope.board[1].playerMove == $scope.board[7].playerMove) && ($scope.board[1].playerMove !== "")) ||
					(($scope.board[2].playerMove == $scope.board[5].playerMove) && ($scope.board[2].playerMove == $scope.board[8].playerMove) && ($scope.board[2].playerMove !== "")) ||
					(($scope.board[0].playerMove == $scope.board[4].playerMove) && ($scope.board[0].playerMove == $scope.board[8].playerMove) && ($scope.board[0].playerMove !== "")) ||
					(($scope.board[2].playerMove == $scope.board[4].playerMove) && ($scope.board[2].playerMove == $scope.board[6].playerMove) && ($scope.board[2].playerMove !== ""))){
						displayWinner(player);
				}
				// tie logic
				else if($scope.counter[0].turn == 9){
					$scope.winMessage[0].message = "What a shock, it's a tie.";
					$scope.winMessage.$save(0);
					$scope.counter[0].turn = -2;
					$scope.counter.$save(0);
				}
			}
		 
		 
			function displayWinner(player){
				if(player == "X"){
					$scope.winMessage[0].message = "Player One Wins";
				}
				else if(player == "O"){
					$scope.winMessage[0].message = "Player Two Wins";
				}
				$scope.winMessage.$save(0);
				$scope.counter[0].turn = -2;
				$scope.counter.$save(0);
			}
	});
// })();