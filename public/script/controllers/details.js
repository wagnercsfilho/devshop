(function(){
  'use strict';

  angular.module('app')
    .controller('DetailsCtrl', DetailsCtrl);

    DetailsCtrl.$inject = ['$rootScope', '$window', '$timeout', '$state', 'DeveloperService', 'CartService', 'growl'];
    function DetailsCtrl($rootScope, $window, $timeout, $state, DeveloperService, CartService, growl){
      var vm = this;
      var id = $state.params.id;

      vm.addCart = function(developer){
        CartService.addItem(developer, 1);
        growl.success("Item added to cart successfully!");
      }

      DeveloperService.getOne(id).success(function(result){
      	vm.developer = result;
      });

    }

})();
