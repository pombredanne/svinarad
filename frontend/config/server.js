var NAZIVI = ["Pranje sudova i ciscenje frizider", "Ciscenje soba i kuvanje caja", "Popravka cevi", "Setanje ljubimaca", "Javljanje na telefon"];

var OPISI = [" Fanny pack vegan paleo pork belly fap, aliqua Pitchfork fixie Intelligentsia artisan", 
" Heirloom bicycle rights wayfarers chillwave. Trust fund fanny pack culpa bicycle rights, messenger bag raw denim crucifix cronut. Jean shorts bespoke Kickstarter Helvetica taxidermy. ",
"Organic velit pug, pop-up distillery readymade consequat chia Banksy est. Organic velit pug, pop-up distillery readymade consequat chia Banksy est.", 
"e veniam organic et Echo Park. Etsy mollit placeat, actually aute flexitarian labore. YOLO meggings cillum, esse aute authentic tempor Tumblr tilde migas dreamcatcher single-origin coffee irure normcore. DIY jean shorts est non heirloom. Delectus mixtape qui.",
"Cornhole literally fixie cray."];

var INST = [
"Swine exercitation tenderloin nulla short ribs biltong",
"Bacon ipsum dolor amet ipsum flank corned beef, frankfurter nulla reprehenderit dolore. Nulla officia shankle short loin veniam velit deserunt, pastrami magna doner exercitation chuck ullamco rump id. Brisket biltong ball tip pariatur qui filet mignon meatloaf sint ut salami short ribs nostrud shankle",
"Swine exercitation tenderloin nulla short ribs biltong aliquip sed labore brisket pancetta ribeye shoulder do bresaola. Alcatra doner tempor filet mignon ribeye ullamco culpa ut cupidatat. Swine fatback occaecat, ea quis in consectetur venison ham ipsum bresaola sirloin. Drumstick voluptate spare ribs non, ribeye prosciutto consectetur landjaeger pork chop exercitation shankle. Qui laboris sint, shank tempor velit ribeye mollit ham prosciutto pork loin. Laboris in minim alcatra, exercitation nulla strip steak filet mignon bresaola venison eu dolore pork belly jerky cillum."
]

var radnici = [
	{id: 1, fullname: 'Alija Sirotanovic', rating: 4},
	{id: 2, fullname: 'Kendi Afrika', rating: 3},
	{id: 1, fullname: 'Lara Svinjogojic', rating: 4},
	{id: 1, fullname: 'Boban Petrovic', rating: 1},
	{id: 1, fullname: 'Miles Davis', rating: 1},
	{id: 1, fullname: 'Niki Petrovic Petrovic', rating: 1},
	{id: 1, fullname: 'Milan Hadzi Afrikanovic', rating: 4},
	{id: 1, fullname: 'Dzoni Bravo', rating: 4}
]

var location = [
	{latitude: 31, longitude: 44},
	{latitude: 32, longitude: 43},
	{latitude: 32, longitude: 44},
	{latitude: 31, longitude: 43}
];

var js = {
	drafting: 0,
	worker_engaged: 1,
	work_done: 2,
	worker_payed: 3, 
	job_done: 4

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getStatus() {
	return getRandomInt(0, 5);
}

function rand(ARR) {
	return ARR[getRandomInt(0, ARR.length)];
}

function rand_credit() {
	return getRandomInt(100, 3000);
}

function shorten (string) {
	return 'Shhhrot:' + string.slice(0, 50);
}

function job (id, name, credit, details, date, location, instructions) {
	return {
		id: id,
		name: name,
		credit: credit,
		location: location, 
		date: date,
		details: details,
		instructions: instructions
	};
}

function random_job(id) {
	return job(id, rand(NAZIVI), rand_credit(), shorten(rand(OPISI)), '2014-20-1:23:23', rand(location), rand(OPISI)); 
}

function rand_worker() {
	return rand(radnici);
}

function range(limit) {
	return Array.apply(null, Array(limit)).map(function (_, i) {return i;});
}

function map_range(limit, f) {
	return range(limit).map(f);
}

function rnd (f) {
	return function (min, max) {
		return map_range(getRandomInt(min, max), f);		
	}
}

function addStati(status, collection) {
	return collection.map(function (j) {
		j.status = status;
		return j;
	});
}
	
function addStatus(job, status) {
	 job.status = status;
	 return job;
}

function job_w_staus(status) {
	return addStatus(random_job(getRandomInt(0, 20)), status);
}

var random_jobs = rnd(random_job);
var radnom_applicants = rnd(rand_worker)

function makeJobs(min, max, status) {
	return addStati(status, random_jobs(min, max));
}

function get(app, url, data) {
	app.get(url, function(req, res) {
		res.json(data);
	});
}

function post(app, url, data) {
	app.post(url, function (req, res) {
		res.json(data);
	});
}

module.exports = {
    drawRoutes: function(app) {
    	app.get('/api/job/owned', function(req, res) {
	  	 	res.json(makeJobs(1, 8, js.drafting));
    	});

    	app.get('/api/job/done', function (req, res) {
    		res.json(makeJobs(2, 3, js.done));
    	});

    	app.get('/api/job/open', function(req, res) {
	  	 	res.json(makeJobs(2, 12, js.drafting));
    	});
    	
    	app.get('/api/job/applied', function(req, res) {
	  	 	res.json(makeJobs(1, 1, js.drafting));
    	});
    	
    	app.get('/api/job/assigned', function(req, res) {
	  	 	res.json(makeJobs(1, 1, js.worker_engaged));
    	});
    	
    	get(app, '/api/job/:id', job_w_staus(getStatus()));

    	post(app, '/api/job/:id/apply', job_w_staus(getStatus()));

    	app.get('/api/job/:id/applicants', function(req, res) {
	  	 	res.json(radnom_applicants(1, 5));
    	});


	}
};
