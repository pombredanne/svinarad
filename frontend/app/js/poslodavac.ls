angular.module \appls .service \ownerAPI (jobs) !->
	@job = jobs

angular.module \appls .directive \employerJob -> do
	restrict: \E
	templateUrl: \poslodavac/job/item.html 
	scope: 
		job: \=
	


 
angular.module \appls .config ($state-provider, $url-router-provider, state-helper-provider) !->
	$url-router-provider.when \/poslodavac/good \/poslodavac/good/start
	state = $state-provider.state

	
	state \poslodavac (do
		url: \/poslodavac 
		templateUrl: \poslodavac/base.html
	)

	state \poslodavac.signup (do 
		url: \/prijava
		templateUrl: \poslodavac/signup.html
	)

	state \poslodavac.home (do 
		url: \/good
		templateUrl: \poslodavac/home.html
	)

	state \poslodavac.home.info (do
		url: \/start
		views: 
			open: 
				templateUrl: \poslodavac/job/open-list.html
				controller: \list-ctrl
				resolve: 
					list: (ownerAPI) -> ownerAPI.job.owned!
			done: 
				templateUrl: \poslodavac/job/done-list.html
				controller: \list-ctrl
				resolve:
					list: (ownerAPI) -> ownerAPI.job.done!
	)

	state \poslodavac.job (do 
		url: \/posao 
		templateUrl: \poslodavac/job/base.html
	)
	
	state \poslodavac.job.add (do 
		url: \/novi 
		templateUrl: \poslodavac/job/add.html
	)

	state \poslodavac.job.detail (do
		url: \/:id
		templateurl: \poslodavac/job/detail.html 
		controller: \detail-ctrl
		resolve:
			source: (ownerAPI) -> ownerAPI.job.detail
	)

