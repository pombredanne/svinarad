angular.module \appls .service \workerAPI (jobs, Restangular) !->
	
	@open-jobs = jobs.open 
	@detail = jobs.detail
	@applied = jobs.applied 
	@assigned-jobs = jobs.assigned

angular.module \appls .directive \workerJob -> do
	restrict: \E
	templateUrl: \radnik/job/item.html 
	scope: {
		job: \=
	}


angular.module \appls .config ($state-provider, $url-router-provider, state-helper-provider) !->
	$url-router-provider.when \/radnik/dom \/radnik/dom/sweet	
	state = state-helper-provider.state

	state \radnik \/radnik \radnik/base.html \home-controller
	state \radnik.signup \/prijava \radnik/signup.html \home-controller


	worker-list = -> do 
		controller: \list-ctrl
		templateUrl: \radnik/job/list.html
		resolve: 
			list: it


	$state-provider.state \radnik.home (do
		url: \/dom
		templateUrl: \radnik/home.html
	)

	$state-provider.state \radnik.home.info (do
		url: \/sweet 
		views: 
			assigned: 
				templateUrl: \radnik/job/assigned-list.html
				controller: \list-ctrl
				resolve: 
					list: (workerAPI) -> workerAPI.assigned-jobs!
			open: 
				controller: \list-ctrl
				templateUrl: \radnik/job/open-list.html
				resolve:
					list: (workerAPI) -> workerAPI.open-jobs!

			applied:

				controller: \list-ctrl
				templateUrl: \radnik/job/applied-list.html
				resolve:
					list: (workerAPI) -> workerAPI.applied!
	)




	state \radnik.job \/posao \radnik/job/base.html \home-controller

	$state-provider.state \radnik.job.detail (do
		url: '/:id'
		templateUrl: \radnik/job/detail.html 
		controller: \detail-ctrl
		resolve:
			source: (workerAPI) -> workerAPI.detail
	)
