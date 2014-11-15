
module.exports = {
    drawRoutes: function(app) {
    	app.get('/api/jobs/owned', function(req, res) {
  	 	res.json([{
			name: "Pranje sudova"
    	 	}]);
    	});
	}
};
