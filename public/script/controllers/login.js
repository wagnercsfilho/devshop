(function(){
  'use strict';

  angular.module('app')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$window', '$timeout', '$state', '$auth', 'DeveloperService', 'AuthService'];
    function LoginCtrl($window, $timeout, $state, $auth, DeveloperService, AuthService){
      var vm = this;
      var step = $state.params.step;
      
      vm.authenticate = function() {
      	$auth.authenticate('github').then(function(result){
            AuthService.verify();
      	});
      };

    }

})();


 