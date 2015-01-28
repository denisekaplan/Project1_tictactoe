var app=angular.module("TicTacApp", []);

app.controller("TicTacCtrl", function($scope){
    $scope.board = ["","","","","","","","",""];

    $scope.turnNumber = 0;

    $scope.makeMove = function(idx){
        $scope.board[idx] = (($scope.turnNumber % 2) == 0 ? "X" : "O");
        $scope.turnNumber++;
    };
});
