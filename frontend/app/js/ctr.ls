angular.module \appls .controller \list-ctrl ($scope, list) !->
	$scope.list = list 


angular.module \appls .controller \detail-ctrl ($scope, $state-params, source) -> 
	source $state-params.id .get!.then !->
		$scope.item = it

angular.module \appls .controller \action-ctrl ($scope, $state-params, $md-dialog, source, modal) !->
	source $state-params.id .get!.then !->
		$scope.item = it

	decorate-with-item = -> 
		it.locals = _.merge (it.locals), (item: $scope.item)
		it


	$scope.action = !-> 
		p = $md-dialog.show decorate-with-item modal



angular.module \appls .controller \modal-action-ctrl ($scope, $md-dialog, action, item) !->
	$scope.dismiss = $md-dialog.hide
	$scope.item = item
	$scope.action = (item) !-> 
		data <- (action item).then 
		$md-dialog.hide data 


	