(function(){
  'use strict';

  angular.module('app')
    .controller('OrdersCtrl', OrdersCtrl);

    OrdersCtrl.$inject = ['$timeout', '$state', 'growl', 'DeveloperService', 'OrderService'];
    function OrdersCtrl($timeout, $state, growl, DeveloperService, OrderService){
      var vm = this;

      OrderService.me().success(function(results){
        vm.orders = results;
      });

    }

})();
