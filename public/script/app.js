(function(){
  'use strict';

  angular.module('app', ['ui.router', 'satellizer', 'angular-growl'])
  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('login', {
      url: '/login/:step',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl as login',
      authenticate: false
    })

    .state('home', {
      url: '/',
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl as home',
      authenticate: false
    })

    .state('search', {
      url: '/search/:q',
      templateUrl: 'views/search.html',
      controller: 'SearchCtrl as search',
      authenticate: false
    })

    .state('details', {
      url: '/details/:id',
      templateUrl: 'views/details.html',
      controller: 'DetailsCtrl as details',
      authenticate: false
    })

    .state('cart', {
      url: '/cart',
      templateUrl: 'views/cart.html',
      controller: 'CartCtrl as cart',
      authenticate: false
    })

    .state('checkout', {
      url: '/checkout',
      templateUrl: 'views/checkout.html',
      controller: 'CheckoutCtrl as checkout',
      authenticate: true
    })

    .state('orders', {
      url: '/orders',
      templateUrl: 'views/orders.html',
      controller: 'OrdersCtrl as order',
      authenticate: true
    });

    $urlRouterProvider.otherwise('/');

  })

  .config(function($authProvider) {

    $authProvider.github({
      url: '/auth/github',
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
      clientId: '76c742beb81f545ed1dc'
    });

  })

  .config(function (growlProvider) {
    growlProvider.globalReversedOrder(true);
    growlProvider.globalTimeToLive(5000);
    growlProvider.globalPosition('top-center');
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })

  .run(function($window, $state, $rootScope, CartService, AuthService){
    AuthService.verify();
    CartService.getStorageCart();

    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (next.authenticate && !AuthService.isLogged()) {
        event.preventDefault();
        $state.go('login');
      }
    });

  });

})();
