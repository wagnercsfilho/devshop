(function(){
  'use strict';

  angular.module('app')
  .controller('ListCartCtrl', ListCart);

  ListCart.$inject = ['$state', '$rootScope','$window', 'growl', '$timeout','DeveloperService', 'CartService'];
  function ListCart($state, $rootScope, $window, growl, $timeout, DeveloperService, CartService){
    var vm = this;

    vm.addCart = function(developer){
      CartService.addItem(developer, 1);

      growl.success("Item added to cart successfully!");
    }

  }

})();