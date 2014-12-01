angular.module \appls .service \ownerAPI (jobs) !->
	@job = jobs

angular.module \appls .directive \employerJob -> do
	restrict: \E
	templateUrl: \poslodavac/job/item.html 
	scope: {
		job: \=
	}


 
angular.module \appls .config ($state-provider, $url-router-provider, state-helper-provider) !->
	state = state-helper-provider.state
	
	state \poslodavac \/poslodavac \poslodavac/base.html \home-controller
	state \poslodavac.signup \/prijava \poslodavac/signup.html \home-controller


	$state-provider.state \poslodavac.home (do 
		url: \/start
		templateUrl: \poslodavac/home.html
		controller: \list-ctrl
		resolve: 
			list: (ownerAPI) -> ownerAPI.job.owned! 
	)


	state \poslodavac.job \/posao \poslodavac/job/base.html \home-controller
	
	state \poslodavac.job.add \/novi \poslodavac/job/add.html \home-controller

	$state-provider.state \poslodavac.job.detail (do
		url: '/:id'
		templateurl: \poslodavac/job/detail.html 
		controller: \detail-ctrl
		resolve:
			source: (ownerapi) -> ownerapi.job.detail
	)

