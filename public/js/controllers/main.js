'use strict';

app.controller('NavCtrl', function($scope, $auth, $state) {
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated(); 
  };

  $scope.logout = function() {
    $auth.logout();
    $state.go('login');
  }
});

