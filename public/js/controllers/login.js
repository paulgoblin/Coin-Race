'use strict';

app.controller('loginCtrl', function($scope, $auth, $rootScope, $state) {
  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
    .then(function(res) {
      $rootScope.token = res.data.token;
      if($auth.isAuthenticated()) {
        $state.go('home');
      }
    })
    .catch(function(err) {
      console.log(err);
    });
  }
});
