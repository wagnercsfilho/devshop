(function(){
  'use strict';

  angular.module('app')
    .controller('SearchCtrl', SearchCtrl);

    SearchCtrl.$inject = ['$rootScope', '$state', '$timeout','DeveloperService'];
    function SearchCtrl($rootScope, $state, $timeout, DeveloperService){
      var vm = this;
      $rootScope.q = $state.params.q;

      DeveloperService.search($rootScope.q).success(function(results){
      	vm.developers = results;	
      });

    }

})();
