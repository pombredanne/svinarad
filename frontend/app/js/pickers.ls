angular.module \appls .directive \timePicker -> do
	restrict: \E
	templateUrl: \pickers/time-picker.html
	scope:
		model: \=timeModel

angular.module \appls .directive \locationPicker -> do
	restrict: \E
	templateUrl: \pickers/location-picker.html
	scope:
		model: \=locationModel
