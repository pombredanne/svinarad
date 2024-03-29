angular.module \appls .service \workerAPI (jobs, Restangular) !->
	@open-jobs = jobs.open 
	@detail = jobs.detail
	@applied = jobs.applied 
	@assigned-jobs = jobs.assigned
	@apply = jobs.apply-for


angular.module \appls .directive \workerJob -> do
	restrict: \E
	templateUrl: \radnik/job/item.html 
	scope: 
		job: \=
	

angular.module \appls .config ($state-provider, $url-router-provider, state-helper-provider) !->
	$url-router-provider.when \/radnik/dom \/radnik/dom/sweet	
	state = $state-provider.state

	state \radnik (do 
		url: \/radnik 
		templateUrl: \radnik/base.html
	)

	state \radnik.signup (do 
		url: \/prijava 
		templateUrl: \radnik/signup.html
	)


	state \radnik.home (do
		url: \/dom
		templateUrl: \radnik/home.html
	)

	state \radnik.home.info (do
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


	state \radnik.job (do 
		url: \/posao
		templateUrl: \radnik/job/base.html
	)

	state \radnik.job.detail (do
		url: '/:id'
		templateUrl: \radnik/job/detail.html 
		controller: \action-ctrl
		resolve:
			source: (workerAPI) -> workerAPI.detail
			modal: -> 
				templateUrl: \radnik/job/apply.html
				controller: \modal-action-ctrl		
				locals: 
					action: (item) -> item.customPOST {} \apply 

	)


