
var app = angular.module('angularInputsApp', []);

app.controller('angularInputsCtrl', function($scope){
	// firebase reference
	var fireRef = new Firebase("https://denisettt.firebaseio.com");
	// each on of these arrays is a row of the board
	$scope.board = [["", "", ""], ["", "", ""], ["", "", ""]];
	
	$scope.game = {board: [1, 2, 3, 4, 5, 6, 7, 8, 9], p1: "X", p2: "O"};
	
	function winConditions(piece){

        for(var i = 0; i < 3; i++){
            if($scope.board[i][0] == $scope.board[i][1] && $scope.board[i][0] == $scope.board[i][2] && $scope.board[i][0] != ""){
                $scope.piece =  piece + " wins!";
            }
            else if($scope.board[0][i] == $scope.board[1][i] && $scope.board[0][i] == $scope.board[2][i] && $scope.board[0][i] != ""){
                $scope.piece =  piece + " wins!";
            }
        }
        if($scope.board[0][0] == $scope.board[1][1] && $scope.board[0][0] == $scope.board[2][2] && $scope.board[0][0] != ""){
                $scope.piece =  piece + " wins!";
           
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












