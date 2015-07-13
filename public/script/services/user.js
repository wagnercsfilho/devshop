(function(){
  'use strict';

  angular.module('app')
    .factory('UserService', UserService);

    UserService.$inject = ['$http', '$window', '$rootScope'];
    function UserService($http, $window, $rootScope){

      return {
        me: me
      }

      function me(lastUser){
        return $http.get('users/me');
      }

    }

})();
