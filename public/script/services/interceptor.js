(function(){
  'use strict';

  angular.module('app')
    .factory('authInterceptor', function ($rootScope, $q, $window, $location) {
            return {

                // Add authorization token to headers
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($window.localStorage.getItem('satellizer_token')) {
                        config.headers.Authorization = 'token ' + $window.localStorage.getItem('satellizer_token');
                    }
                    return config || $q.when(config);
                }

            };
        })

})();
