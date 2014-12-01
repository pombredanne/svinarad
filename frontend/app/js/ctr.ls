
angular.module \appls .controller \list-ctrl ($scope, list) !->
	$scope.list = list 


angular.module \appls .controller \detail-ctrl ($scope, $state-params, source) -> 
	source $state-params.id .get!.then !->
		$scope.item = it
