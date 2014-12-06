{tail, map, id} = require \prelude-ls

angular.module \appls .config ($state-provider, $url-router-provider, state-helper-provider) !->
	state = state-helper-provider.state
	$url-router-provider.otherwise \/home

	$state-provider.state \home (do
		url: \/home
		templateUrl: \home.html
	)