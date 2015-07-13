(function(){
  'use strict';

  angular.module('app')
    .controller('CheckoutCtrl', CheckoutCtrl);

    CheckoutCtrl.$inject = ['$timeout', '$state', 'growl', 'DeveloperService', 'CartService', 'OrderService'];
    function CheckoutCtrl($timeout, $state, growl, DeveloperService, CartService, OrderService){
      var vm = this;

      vm.pay = function(){
        OrderService.create(CartService.getCart()).success(function(){
          CartService.empty();
          growl.success("Was successful purchase!");
          $state.go('home');
        }).error(function(err){
          growl.error('An error occurred while trying to make the purchase!');
        });
      	
      }


    }

})();
