angular.module("appls", 
	["restangular", "ngAnimate", "ui.router", "ngMaterial", "ng-valid-number"]);

angular.module("appls").config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl('/api');
});
