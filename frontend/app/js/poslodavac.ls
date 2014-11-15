angular.module \appls .factory \jobs (Restangular) -> Restangular.all \jobs

angular.module \appls .service \ownerAPI (jobs) !->
	console.log jobs.get-list \owned
	@get-jobs = -> jobs.get-list \owned


angular.module \appls .controller \poslodavac-home-ctrl ($scope, ownerAPI) !->
	ownerAPI.get-jobs!then !-> $scope.owned = it

