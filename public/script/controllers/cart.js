(function(){
  'use strict';

  angular.module('app')
    .controller('CartCtrl', CartCtrl);

    CartCtrl.$inject = ['$timeout', '$rootScope', '$state', 'growl', 'DeveloperService', 'CartService', 'AuthService'];
    function CartCtrl($timeout, $rootScope, $state, growl, DeveloperService, CartService, AuthService){
      var vm = this;

      vm.updateItem = function(developer, quantity){
      	CartService.updateItem(developer, quantity);
      	growl.success("Item successfully updated!");
      }

      vm.removeItem = function(developer){
      	CartService.removeItem(developer);
      	growl.success("Item successfully removed!");   
      }

      vm.getSubTotal = function(){
      	return CartService.getSubTotal();
      }

      vm.getDiscount = function(){
      	return CartService.getDiscount();
      }

      vm.getTotal = function(){
      	return CartService.getTotal();
      }

      vm.applyDiscountCoupon = function(discountCoupon){
      	CartService.getDiscountCoupon(discountCoupon).success(function(result){
          vm.discountCoupon = discountCoupon;
      		CartService.setDiscount(result.discount_percent);
      		growl.success('Coupon successfully added');
      	}).error(function(){
      		growl.error('Coupon not found!');
      	});
      }

      vm.checkout = function(){
        if (AuthService.isLogged()){
          $state.go('checkout');
        } else {
          $state.go('login');
        }
      }

    }

})();
