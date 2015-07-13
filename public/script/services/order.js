(function(){
  'use strict';

  angular.module('app')
    .factory('OrderService', OrderService);

    OrderService.$inject = ['$http'];
    function OrderService($http){
      return {
        me: me,
        create: create
      }

      function me(lastUser){
        return $http.get('orders/me');
      }

      function create(data){
        return $http.post('orders', data)
      }

    }

})();
