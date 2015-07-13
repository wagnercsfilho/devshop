(function(){
  'use strict';

  angular.module('app')
  .factory('CartService', CartService);

  CartService.$inject = ['$window', '$http', '$rootScope'];
  function CartService($window, $http, $rootScope){
    $rootScope.cart = {
      items: [],
      subTotal: 0,
      discount_percent: 0,
      discount: 0,
      total: 0
    };

    var Cart = {
      addItem: addItem,
      updateItem: updateItem,
      removeItem: removeItem,
      getStorageCart: getStorageCart,
      getSubTotal: getSubTotal,
      getDiscountCoupon: getDiscountCoupon,
      setDiscount: setDiscount,
      getDiscount: getDiscount,
      getTotal: getTotal,
      updateCart: updateCart,
      getQuantity: getQuantity,
      empty: empty,
      getCart: getCart
    }

    return Cart;

    function getCart(){
      return $rootScope.cart;
    }

    function empty(){
      $rootScope.cart = {
        items: [],
        subTotal: 0,
        discount_percent: 0,
        discount: 0,
        total: 0
      };
      emptyLocalStorage();
    }

    function addItem(developer, quantity){
      var exist = $rootScope.cart.items.filter(function( obj ) {
        return obj.developer.login == developer.login;
      });

      if (exist.length == 0){

        $rootScope.cart.items.push({
          developer: developer,
          quantity: quantity
        });

      } else {
        angular.forEach($rootScope.cart.items, function(obj){
          if (obj.developer.login == developer.login){
            obj.quantity = obj.quantity + quantity;
          }
        });
      }

      Cart.updateCart();

    }

    function updateItem(developer, quantity){
      angular.forEach($rootScope.cart.items, function(obj){
        if (obj.developer.login == developer.login){
          obj.quantity = quantity;
        }
      });

      Cart.updateCart();
    }

    function removeItem(developer){
      angular.forEach($rootScope.cart.items, function(obj, idx){
        if (obj.developer.login == developer.login){
          $rootScope.cart.items.splice(idx, 1);
        }
      });

      Cart.updateCart();
    }

    function getSubTotal(){
      var subtotal = 0;
      angular.forEach($rootScope.cart.items, function(obj, idx){
        subtotal += (obj.developer.price * obj.quantity);
      });
      return subtotal;
    }

    function getDiscount(){
      return $rootScope.cart.discount_percent == 0 ? 0 : ($rootScope.cart.subTotal / $rootScope.cart.discount_percent);   
    }

    function getTotal(){
      return ($rootScope.cart.subTotal - $rootScope.cart.discount);
    }

    function setDiscount(discount_percent){
      $rootScope.cart.discount_percent = discount_percent;
      Cart.updateCart();
    }

    function getDiscountCoupon(discount){
      return $http.get('discount-coupon/' + discount);
    }

    function getQuantity(){
      var quantity = 0;
      angular.forEach($rootScope.cart.items, function(obj, idx){
        quantity += obj.quantity;
      });
      return quantity;
    }

    function updateCart(){     
      $rootScope.cart.subTotal = getSubTotal();
      $rootScope.cart.discount = getDiscount();
      $rootScope.cart.total = getTotal();

      updateLocalStorage();
    }

    function getStorageCart(){
      if ($window.localStorage.getItem('cart')){
        $rootScope.cart = JSON.parse($window.localStorage.getItem('cart'));
      }
    }

    function updateLocalStorage(){
      $window.localStorage.setItem('cart', JSON.stringify($rootScope.cart));
    }

    function emptyLocalStorage(){
      $window.localStorage.removeItem('cart');
    }

  }

})();
