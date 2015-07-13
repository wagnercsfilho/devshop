(function(){
  'use strict';

  angular.module('app')
    .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['growl', '$rootScope', '$state','$timeout','DeveloperService', 'CartService', 'AuthService'];
    function MainCtrl(growl, $rootScope, $state, $timeout, DeveloperService, CartService, AuthService){
      var vm = this;
      $rootScope.$state = $state;
      $rootScope.q = null;

      vm.search = function(){
      	$state.go('search', { q: $rootScope.q })
      }

      vm.getQuantity = function(){
        return CartService.getQuantity();
      }

      vm.logOut = function(){
        AuthService.logOut();
        $state.go('home');
      }

      vm.removeItem = function(developer){
        CartService.removeItem(developer);  
        growl.success("Item successfully removed!");    
      }
    }

})();
