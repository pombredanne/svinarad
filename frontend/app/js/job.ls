angular.module \appls .factory \jobs (Restangular) -> 
	j = Restangular.all \job

	return do
		owned: -> j.customGET \owned
		detail: -> Restangular.one \job it
		open: -> j.customGET \open
		applied: -> j.customGET \applied
		assigned: -> j.customGET \assigned

