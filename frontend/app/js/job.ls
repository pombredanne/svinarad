angular.module \appls .factory \jobs (Restangular) -> 
	j = Restangular.all \job
	jo = Restangular.one \job _

	return do
		owned: -> j.customGET \owned
		detail: -> jo it
		open: -> j.customGET \open
		applied: -> j.customGET \applied
		assigned: -> j.customGET \assigned
		done: -> j.customGET \done
		applicants: -> jo it .get-list \applicants
		apply-for: -> it.customPOST {} \apply

