(function(){
  'use strict';

  angular.module('app')
    .factory('DeveloperService', DeveloperService);

    DeveloperService.$inject = ['$http'];
    function DeveloperService($http){
      return {
        getAll: getAll,
        getOne: getOne,
        search: search
      }

      function getAll(lastUser){
        return $http.get('developers?since='+lastUser);
      }

      function getOne(id){
        return $http.get('developers/'+id);
      }

      function search(q){
        return $http.get('developers/search/'+q);
      }
    }

})();
