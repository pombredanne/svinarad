{tail, map, id} = require \prelude-ls
angular.module \appls .config ($stateProvider, $urlRouterProvider) !->

	state-options = (url, templateUrl, controller) -> {url, templateUrl, controller}
	state = (name) ->
		$stateProvider.state name, state-options.apply null, tail map id, arguments

	state \home \/home \home.html \home-controller
	state \poslodavac \/poslodavac \poslodavac/base.html \home-controller
	state \poslodavac.signup \/prijava \poslodavac/signup.html \home-controller

	state \poslodavac.job \/posao \poslodavac/job/base.html \home-controller
	state \poslodavac.job.add \/novi \poslodavac/job/add.html \home-controller

	state \radnik \/radnik \radnik/base.html \home-controller
	state \radnik.signup \/prijava \radnik/signup.html \home-controller
	state \radnik.dom \/dom \radnik/home.html \home-controller

	$urlRouterProvider.otherwise \/home

