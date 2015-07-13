(function(){
  'use strict';

  angular.module('app')
    .directive('whenScrolled', function() {
	    return {
	    	link: function(scope, elm, attrs) {
		        var raw = elm[0];
		        
		        elm.bind('scroll', function() {
		        	console.log('scroll');
		            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
		            	console.log(attrs.whenScrolled)
						scope.$apply(function() { 
						    scope.$eval(attrs.whenScrolled); 
						});
		            }
		        });
		    }
		}
	});

})();
