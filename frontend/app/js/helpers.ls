{tail, map, id} = require \prelude-ls

angular.module \appls .provider \stateHelper ($state-provider) !->	
	state-options = (url, templateUrl, controller) -> {url, templateUrl, controller}
	state = (name) ->
		$state-provider.state name, state-options.apply null, tail map id, arguments

	@state = state 

	@$get = -> {state}
