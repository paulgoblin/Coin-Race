'use strict';

app.controller('NavCtrl', function($scope, $auth, $state, socket, gameSrvc) {

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated(); 
  };

  $scope.logout = function() {
    socket.emit('logout', gameSrvc.meId)
    gameSrvc.reset();
    $auth.logout();
    $state.go('login');
  }
});

