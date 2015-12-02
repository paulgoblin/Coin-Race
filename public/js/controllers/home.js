'use strict';

app.controller('homeCtrl', function($scope, $rootScope, $http) {
  $http.get('/user')
  .then(function(resp) {
    console.log(resp);
    $scope.user = resp.data;


    $http.get('/users')
    .then(function(resp) {
      console.log(resp.data);
      $scope.users = resp.data;
    });
  });
});
