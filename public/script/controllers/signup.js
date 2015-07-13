(function(){
  'use strict';

  angular.module('app')
    .controller('SignupCtrl', SignupCtrl);

    SignupCtrl.$inject = ['$window', 'growl', '$timeout', '$state', '$auth', 'UserService', 'AuthService'];
    function SignupCtrl($window, growl, $timeout, $state, $auth, UserService, AuthService){
      var vm = this;
      vm.formUser = {};

      vm.create = function(){
        var data = angular.copy(vm.formUser);
        UserService.create(data).success(function(result){
          $window.localStorage.setItem('satellizer_token', result.token);
          AuthService.verify();
          growl.success('Account successfully created!');
          $state.go('home');
        }).error(function(err){
          growl.error(err.message);
        })
      }

    }

})();


 