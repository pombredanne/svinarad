angular.module \appls .config ($stateProvider, $urlRouterProvider) !->
	
	$urlRouterProvider.otherwise \/home
	
	$stateProvider.state \home do 
		url: \/home 
		templateUrl: \home.html 
		controller: \home-controller
