'use strict';


app.service('userService', function($http) {
  this.get = function() {
    return $http.get('/user');
  }
})