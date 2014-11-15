angular.module \appls .controller \home-controller ($scope) !->
	$scope.step = 0
	$scope.sites = [\fuca.rs]
	$scope.toggle = -> if it in $scope.sites then $scope.remove it else $scope.sites.push it
	$scope.selected = -> it in $scope.sites
	$scope.remove = !-> $scope.sites = _.without $scope.sites, it
	$scope.do = !->
		$scope.action = it
		$scope.step = if $scope.choosen then 4 else 3

	$scope.choosen = false
	$scope.foo = !->
		$scope.choosen = true
		$scope.step = 4

	$scope.do-select = !->
		$scope.choosen = false
		$scope.step = 3
