(function(){
  'use strict';

  angular.module('app')
  .controller('HomeCtrl', HomeCtrl);

  HomeCtrl.$inject = ['$state', '$rootScope','$window', 'growl', '$timeout','DeveloperService', 'CartService'];
  function HomeCtrl($state, $rootScope, $window, growl, $timeout, DeveloperService, CartService){
    var vm = this;
    $rootScope.scrollLoad = true;
    var lastUser = null;

    DeveloperService.getAll(lastUser)
    .success(function(results){
      vm.developers = results;
      lastUser = results[results.length - 1].id;
    });

    vm.loadMore = function(){
      DeveloperService.getAll(lastUser)
      .success(function(results){
        vm.developers = vm.developers.concat(results);
        lastUser = results[results.length - 1].id;

        $timeout(function(){

          $rootScope.scrollLoad = true;
        },100);

      });
    }

  }

})();
