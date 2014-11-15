angular.module('ng-valid-number', []);

angular.module('ng-valid-number').directive('validNumber', function($compile) {
	return {
		require: '?ngModel',
		link: function(scope, element, attrs, ngModelCtrl) {
			var vn = 'valid-number'; 
			var parser = function(val) {
				var clean = val.replace( /[^0-9]+/g, '');

				if (val !== clean) {
					ngModelCtrl.$setViewValue(clean);
					ngModelCtrl.$render();
				}
				return clean;
			};

			var input = element;

			if (element.prop("tagName") === 'MD-INPUT-GROUP') {
					input = element.find("input");
					input.attr(vn, '');
					element.removeAttr(vn);
					$compile(element)(scope);
			}
			else {
				if(!ngModelCtrl) { return; }
					
				ngModelCtrl.$parsers.push(parser);    
				input.bind('keypress', function(event) {
					if(event.keyCode === 32) { event.preventDefault(); }
				});
			}
		}
	};
});
