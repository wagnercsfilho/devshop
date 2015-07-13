(function(){
  'use strict';

  angular.module('app')
    .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$window', 'growl', '$timeout', '$state', '$auth', 'DeveloperService', 'AuthService'];
    function LoginCtrl($window, growl, $timeout, $state, $auth, DeveloperService, AuthService){
      var vm = this;
      var step = $state.params.step;
      vm.formLogin = {};
      
      vm.authenticate = function() {
      	$auth.authenticate('github').then(function(result){
            AuthService.verify();
      	});
      };

      vm.login = function(){
        var data = angular.copy(vm.formLogin);
        AuthService.login(data).success(function(result){
          $window.localStorage.setItem('satellizer_token', result.token);
          AuthService.verify();
        }).error(function(err){
          growl.error(err.message);
        })
      }

    }

})();


 