(function(){
  'use strict';

  angular.module('app')
    .factory('UserService', UserService);

    UserService.$inject = ['$http', '$window', '$rootScope'];
    function UserService($http, $window, $rootScope){

      return {
        me: me,
        create: create
      }

      function me(lastUser){
        return $http.get('users/me');
      }

      function create(data){
        return $http.post('users', data);
      }



    }

})();
