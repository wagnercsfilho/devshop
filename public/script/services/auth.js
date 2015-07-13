(function(){
  'use strict';

  angular.module('app')
    .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', '$window', '$rootScope', 'UserService'];
    function AuthService($http, $window, $rootScope, UserService){

      $rootScope.currentUser = null;

      return {
        verify: verify,
        isLogged: isLogged,
        logOut: logOut,
        login: login
      }

      function login(data){
        return $http.post('auth/login', data);
      }

      function verify(lastUser){
        if ($window.localStorage.getItem('satellizer_token')){
          UserService.me().success(function(result){
            $rootScope.currentUser = result;
          }).error(function(err){
            $rootScope.currentUser = null;
            $window.localStorage.removeItem('satellizer_token');
          })
        }
      }

      function logOut(){
        $rootScope.currentUser = null;
        $window.localStorage.removeItem('satellizer_token');
      }

      function isLogged(){
        return $window.localStorage.getItem('satellizer_token');
      }

    }

})();
