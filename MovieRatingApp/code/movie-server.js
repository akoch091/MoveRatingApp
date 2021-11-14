const express = require('express'); //loading express
var bodyParser = require('body-parser')
const fs = require("fs"); //loading file manager
const config = require("./config.json"); //loading the config file 
const session = require('express-session');//loading the session
const businessLogic = require('./business');//loading the business logic

//launching express app
const app = express(); 

//sets the pug engine
app.set("view engine", "pug"); 

//Authentication process
app.use(session({secret: 'some secret here'}))
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.use("/", function(req, res, next){
	console.log(req.session);
	next();
});

//Serve static resources from views folder
app.use(express.static("views")); 


//***********************REST CALLS************************************* */

app.get("/", respondHome);

app.get("/persons", function(req, res, next){
	let people = businessLogic.persons;
	res.render("persons", {people : people});
});

app.get("/reviewpage/:movietitle", function(req, res, next){
	let title = req.params.movietitle;
	let status = "";
	res.render("addreview", {status : status, title : title});
});

app.get("/films", function(req, res, next){
	let movies = businessLogic.movies;
	//res.send(movies);
	//console.log(movies);
	res.render("movies", {movies : movies});
});


app.get("/persons/:id", function(req, res, next){

	//console.log(businessLogic.persons);
	let personID = req.params.id;
	let person = null;

	for (let i = 0; i < businessLogic.persons.length; i++){
		if(businessLogic.persons[i].Id.toString() === personID){
			person = businessLogic.persons[i];
		}
	}
	
	if(person != null){
		let name = person.Name;
		let bio = person.Bio;
		let movies = person.Movies;
		let collaborators = person.Collaborators;



		
		let topCollaboratorsList = [];
		let moviesList = [];

		for (let i = 0; i < businessLogic.movies.length; i++){

			for (let j = 0; j < businessLogic.movies[i].Stars.length; j ++){


				if (name === businessLogic.movies[i].Stars[j] || name === businessLogic.movies[i].Writer[j] || name === businessLogic.movies[i].Director[j]){
					moviesList.push(businessLogic.movies[i]);
					Array.prototype.push.apply(topCollaboratorsList, businessLogic.movies[i].Stars);
					Array.prototype.push.apply(topCollaboratorsList, businessLogic.movies[i].Writer);
					Array.prototype.push.apply(topCollaboratorsList, businessLogic.movies[i].Director);
				}
			}
		}
		moviesList = Array.from(new Set(moviesList));
		topCollaboratorsList = Array.from(new Set(topCollaboratorsList));
		topCollaboratorsList = topCollaboratorsList.filter(e => e !== name);
		

		let colabList = [];

		for (let i = 0; i < businessLogic.persons.length; i ++){
	
			for (let j = 0; j < topCollaboratorsList.length; j++){
	
				if(topCollaboratorsList[j] == businessLogic.persons[i].Name){
					colabList.push(businessLogic.persons[i]);
				}
			}
		}

		
		res.render('personpage', {name : name, bio : bio, moviesList : moviesList, colabList : colabList});
	}
	else{
		res.status(404).send("ERROR 404: person not found");
	}
});

app.get("/films/:id", function(req, res, next){

	let movieID = req.params.id;
	let movie = null;

	for (let i = 0; i < businessLogic.movies.length; i++){
		if(businessLogic.movies[i].Id.toString() === movieID){
			movie = businessLogic.movies[i];
		}
	}
	if(movie != null){
		let title = movie.Title;
		let reviews = movie.Reviews;
		let releaseDate = movie.ReleaseDate;
		let genre = movie.Genre;
		let stars = movie.Stars;
		let writer = movie.Writer;
		let director = movie.Director;
		let runtime = movie.Runtime;
		let plot = movie.Plot;
		let averagerating = 0;

		for (let i = 0; i < reviews.length; i ++){
			averagerating = averagerating + reviews[i].Score;
		}
		averagerating = averagerating/reviews.length;

		for (let i = 0; i < businessLogic.movies.length; i++){
			if(businessLogic.movies[i].Id.toString() === movieID){
				businessLogic.movies[i].AverageRating = averagerating;
				break;
			}
		}

		let Stars = [];
		let Writers = [];
		let Directors = [];
		let RelatedMovies = [];

		for (let i = 0; i < businessLogic.persons.length; i ++){
	
			for (let j = 0; j < movie.Stars.length; j++){
	
				if(movie.Stars[j] == businessLogic.persons[i].Name){
					Stars.push(businessLogic.persons[i]);
				}
			}

			for (let j = 0; j < movie.Stars.length; j++){
	
				if(movie.Writer[j] == businessLogic.persons[i].Name){
					Writers.push(businessLogic.persons[i]);
				}
			}

			for (let j = 0; j < movie.Stars.length; j++){
	
				if(movie.Director[j] == businessLogic.persons[i].Name){
					Directors.push(businessLogic.persons[i]);
				}
			}
		}

		for (let i = 0; i < businessLogic.movies.length; i ++){
			if(businessLogic.movies[i].Genre === genre){
				RelatedMovies.push(businessLogic.movies[i]);
			}
		}

		RelatedMovies = Array.from(new Set(RelatedMovies));
		RelatedMovies = RelatedMovies.filter(e => e.Title !== title);

		Stars = Array.from(new Set(Stars));
		Writers = Array.from(new Set(Writers));
		Directors  = Array.from(new Set(Directors ));

		let Id = movie.Id;
		//console.log(reviews);


		res.render('moviepage', {title : title, reviews : reviews, releaseDate : releaseDate, genre: genre, Stars : Stars , Writers: Writers, Directors : Directors, runtime : runtime, plot : plot, averagerating : averagerating, RelatedMovies : RelatedMovies, Id : Id});
	}
	else{
		res.status(404).send("ERROR 404: Movie not found");
	}
});


app.get("/otheruser/:username", function(req, res, next){

	let username = req.params.username;
	console.log(username);
	let user = null;

	for  (let i = 0; i < businessLogic.users.length; i++){

		if(businessLogic.users[i].Username === username){
			user = businessLogic.users[i];
		}
	}


	if (user != null){

		let username = user.Username;
		let type = user.Type;
		let peopleFollow = user.PeopleFollow;
		let usersFollow = user.UsersFollow;
		let peopleList = [];
		

		for (let i = 0; i < businessLogic.persons.length; i ++){
	
			for (let j = 0; j < peopleFollow.length; j++){
	
				if(peopleFollow[j] == businessLogic.persons[i].Name){
					peopleList.push(businessLogic.persons[i]);
				}
			}
		}


		let recommendedMoviesList = [];

		for (let i = 0; i < businessLogic.movies.length; i++){
			for(let j = 0; j < peopleFollow.length; j++){
	
				if(businessLogic.movies[i].Stars.includes(peopleFollow[j])){
					recommendedMoviesList.push(businessLogic.movies[i]);
				}

				if(businessLogic.movies[i].Director.includes(peopleFollow[j])){
					recommendedMoviesList.push(businessLogic.movies[i]);
				}
	
				if(businessLogic.movies[i].Writer.includes(peopleFollow[j])){
					recommendedMoviesList.push(businessLogic.movies[i]);
				}
			}
	
		}

		recommendedMoviesList = Array.from(new Set(recommendedMoviesList));

		let reviews = user.Reviews;

		res.render("otheruser", {username: username, type: type, peopleList : peopleList, usersFollow : usersFollow, recommendedMoviesList : recommendedMoviesList, reviews : reviews});
	}
	else{
		res.status(404).send("ERROR 404: user not found");
	}

});

app.get("/editmovie/:id", function(req, res, next){
	let people = [];
	people.push("None");
	for(let i = 0; i < businessLogic.persons.length; i++){
		people.push(businessLogic.persons[i].Name);
	}
	res.render("editmovie", {people : people});
});

app.get("/searchpage/:params", function(req, res, next){
	let params= req.params.params;


	let movies = [];
	let people = [];

	for(let i = 0; i < businessLogic.movies.length; i++){
		if (businessLogic.movies[i].Title.toLowerCase().includes(params.toLowerCase()) || businessLogic.movies[i].Genre.toLowerCase().includes(params.toLowerCase())){
			movies.push(businessLogic.movies[i]);
		}
	}

	for(let i = 0; i < businessLogic.persons.length; i++){
		if(businessLogic.persons[i].Name.toLowerCase().includes(params.toLowerCase())){
			people.push(businessLogic.persons[i]);
		}
	}

	res.render("searchresult", {movies: movies, people : people , params : params});


});


app.get("/addPerson", function(req, res, next){
	res.render('addPerson');
});

app.get("/addMovie", function(req, res, next){
	res.render('addMovie');
});


app.get("/review/:movietitle", function(req, res, next){
	let movietitle = req.params.movietitle;
	res.redirect(`/reviewpage/${movietitle}`);
});

app.get("/search/:searchparam", function(req, res, next){
	let params= req.params.searchparam;
	res.redirect(`/searchpage/${params}`);
});

app.get("/addMoviePage", function(req, res, next){
	res.redirect('/addMovie');
});

app.get("/addPersonPage", function(req, res, next){
	res.redirect('/addPerson');
});

app.get("/requestpeople", function(req, res, next){
	res.redirect('/persons');
});

app.get("/requestmovies", function(req, res, next){
	res.redirect('/films');
});

app.get("/UserProfile", function(req, res, next){

	let username = req.session.user.Username;
	let reviews = [];
	if(("Reviews" in req.session.user)){
		reviews = req.session.user.Reviews;
	}
	let type = req.session.user.Type;
	let peopleFollow = req.session.user.PeopleFollow;
	let usersFollow = req.session.user.UsersFollow;
	let recommendedMovies = req.session.user.RecommendedMovies;

	let peopleList = [];

	for (let i = 0; i < businessLogic.persons.length; i ++){

		for (let j = 0; j < peopleFollow.length; j++){

			if(peopleFollow[j] == businessLogic.persons[i].Name){
				peopleList.push(businessLogic.persons[i]);
			}
		}
	}

	let recommendedMoviesList = [];

	for (let i = 0; i < businessLogic.movies.length; i++){
		for(let j = 0; j < peopleFollow.length; j++){

			if(businessLogic.movies[i].Stars.includes(peopleFollow[j])){
				recommendedMoviesList.push(businessLogic.movies[i]);
			}

			if(businessLogic.movies[i].Director.includes(peopleFollow[j])){
				recommendedMoviesList.push(businessLogic.movies[i]);
			}

			if(businessLogic.movies[i].Writer.includes(peopleFollow[j])){
				recommendedMoviesList.push(businessLogic.movies[i]);
			}
		}

	}


	recommendedMoviesList = Array.from(new Set(recommendedMoviesList));

	res.render("myuser", {username: username, type: type, peopleList : peopleList, usersFollow : usersFollow, recommendedMoviesList : recommendedMoviesList, reviews : reviews});
});

//POST request for authentication
app.post("/signin", function(req, res, next){
	//console.log(businessLogic.users);
	let ret = businessLogic.authenticate(req.body.username, req.body.password);

	if( ret === 1){
		//successfully logged in
		for(let i = 0; i < businessLogic.users.length; i++){
			
			if(businessLogic.users[i].Username === req.body.username){
				req.session.user = businessLogic.users[i];
			}
		}
		res.redirect('/UserProfile');
	}
	else if(ret === 2)
	{
		//wrong password 
		res.status(403).send("ERROR 403: Invalid password");

	}
	else if(ret === 3)
	{	
		//not a member you may sign up
		res.status(401).send("ERROR 401: Account does not exist");

	}
});


app.post("/addreview/:title", function(req, res, next){
	let movietitle = req.params.title;
	movietitle = movietitle.replace("%20", " ");

	let movie = null;
	let user = req.session.user;
	let longreview = req.body.longreview;
	let shortreview = req.body.shortreview;
	let score = parseInt(req.body.score, 10);


	for(let i = 0; i < businessLogic.movies.length; i ++){
		if (businessLogic.movies[i].Title == movietitle){
			movie = businessLogic.movies[i];
		}
	}

	businessLogic.leaveShortReview(user, movie, score, shortreview, longreview );
	res.redirect(`/films/${movie.Id}`);


});


app.post("/editmoviepage/:Id", function(req, res, next){
	let Id = req.params.Id;
	console.log(Id);
	let actor = req.body.actor;
	let director = req.body.director;
	let writer = req.body.writer;

	for(let i = 0; i < businessLogic.movies.length; i++){
		if(parseInt(Id, 10) == businessLogic.movies[i].Id){
			if(actor != "None"){
				businessLogic.movies[i].Stars.push(actor);
				businessLogic.movies[i].Stars = Array.from(new Set(businessLogic.movies[i].Stars));
			}
			if(director != "None"){
				businessLogic.movies[i].Director.push(director);
				businessLogic.movies[i].Director = Array.from(new Set(businessLogic.movies[i].Director));
			}
			if(writer != "None"){
				businessLogic.movies[i].Writer.push(writer);
				businessLogic.movies[i].Writer = Array.from(new Set(businessLogic.movies[i].Writer));
			}
		}
	}

	res.redirect(`/films/${Id}`);

});

//POST for signing up a user
app.post("/signup", function(req, res, next){

	let ret = businessLogic.createUser(req.body);
	if(ret === null){
		res.status(400).send("Invalid credentials, user may exist");
	}
	else{
		res.status(200).send("Succesfully created " + req.body.username);
	}
});

app.post("/changeUserType", function(req, res, next){
	if(req.session.user.Type === "contributing"){
		req.session.user.Type = "regular";
	}
	else{
		req.session.user.Type = "contributing";
	}
	res.redirect('/UserProfile');
});


app.post("/addPersonObject", function(req, res, next){
	//console.log(req.body);
	businessLogic.addNewPerson(req.session.user, req.body);
	res.redirect('/persons');
});

app.post("/addMovieObject", function(req, res, next){
	//console.log(req.body);
	businessLogic.addNewMovie(req.session.user, req.body);
	res.redirect('/films');
});


app.post("/followuser", function(req, res, next){
	let username = req.body.username;
	for(let i = 0; i < businessLogic.users.length; i ++){

		if(businessLogic.users[i].Username == req.session.user.Username){
			businessLogic.users[i].UsersFollow.push(username);
			businessLogic.users[i].UsersFollow = Array.from(new Set(businessLogic.users[i].UsersFollow));
		}
	}

	req.session.user.UsersFollow.push(username);
	req.session.user.UsersFollow = Array.from(new Set(req.session.user.UsersFollow));
	res.redirect('/userprofile');
});


app.post("/unfollowuser", function(req, res, next){
	let username = req.body.username;
	for(let i = 0; i < businessLogic.users.length; i ++){

		if(businessLogic.users[i].Username == req.session.user.Username){
			businessLogic.users[i].UsersFollow = businessLogic.users[i].UsersFollow.filter(e => e !== username);
		}
	}

	req.session.user.UsersFollow = req.session.user.UsersFollow.filter(e => e !== username);
	res.redirect('/userprofile');
});

app.post("/followperson", function(req, res, next){
	let Id = req.body.Id;
	let personName = null;
	for(let i = 0; i < businessLogic.persons.length; i++){
		if(businessLogic.persons[i].Id == Id){
			personName = businessLogic.persons[i].Name;
		}
	}

	if (personName != null){
		console.log("in here");
		for(let i = 0; i < businessLogic.users.length; i ++){

			if(businessLogic.users[i].Username == req.session.user.Username){
				businessLogic.users[i].PeopleFollow.push(personName);
				businessLogic.users[i].PeopleFollow = Array.from(new Set(businessLogic.users[i].PeopleFollow));
			}
		}
		req.session.user.PeopleFollow.push(personName);
		req.session.user.PeopleFollow = Array.from(new Set(req.session.user.PeopleFollow));
		res.redirect('/userprofile');
	}

});


app.post("/unfollowperson", function(req, res, next){
	
	let Id = req.body.Id;
	let personName = null;

	for(let i = 0; i < businessLogic.persons.length; i++){
		if(businessLogic.persons[i].Id == Id){
			personName = businessLogic.persons[i].Name;
		}
	}

	if (personName != null){

		for(let i = 0; i < businessLogic.users.length; i ++){

			if(businessLogic.users[i].Username == req.session.user.Username){
				businessLogic.users[i].PeopleFollow = businessLogic.users[i].UsersFollow.filter(e => e !== personName);
			}
		}
	
		req.session.user.PeopleFollow = req.session.user.PeopleFollow.filter(e => e !== personName);
		res.redirect('/userprofile');

	}
});

//REST API/public JSON REST API code, tested with POST MAN CALLS

app.post("/movies", function(req, res, next){
	let movie = req.body;
	let flag = true;
	if(("title" in req.body ) && ("date" in req.body) && ("genre" in req.body ) && ("writer" in req.body ) && ("director" in req.body ) && ("runtime" in req.body ) && ("plot" in req.body )){
		let Type = "contributing";
		let tempUser = {Type};
		businessLogic.addNewMovie(tempUser, req.body);
		flag = false;
		let obj = [businessLogic.movies, businessLogic.persons];
		res.send(obj);
	}
	if(flag){
		let obj = {"message" : "Incorrect format didn't add the movie"};
		res.send(obj);
	}
	
});


app.get("/movies", function(req, res, next){
	let movies = [];

	if(!("title" in req.query) && !("genre" in req.query) && !("year" in req.query) && !("minrating" in req.query)){
		res.send(businessLogic.movies);
	}
	else{
		if("title" in req.query){
			for(let i = 0; i < businessLogic.movies.length; i++){
				if(businessLogic.movies[i].Title.toLowerCase() == req.query.title.toLowerCase()){
					movies.push(businessLogic.movies[i]);
				}
			}
		}
		if("genre" in req.query){
			for(let i = 0; i < businessLogic.movies.length; i++){
				if(businessLogic.movies[i].Genre.toLowerCase() == req.query.genre.toLowerCase()){
					movies.push(businessLogic.movies[i]);
				}
			}
	
		}
		if("year" in req.query){
			for(let i = 0; i < businessLogic.movies.length; i++){
				if(businessLogic.movies[i].ReleaseDate == req.query.year){
					movies.push(businessLogic.movies[i]);
				}
			}
		}
		if("minrating" in req.query){
			for(let i = 0; i < businessLogic.movies.length; i++){
				if(businessLogic.movies[i].AverageRating >= parseFloat(req.query.minrating)){
					movies.push(businessLogic.movies[i]);
				}
			}
		}

		movies = Array.from(new Set(movies));
		res.send(movies);

	}


});


app.get("/movies/:Id", function(req, res, next){
	let id = req.params.Id;
	let flag = true;
	for(let i = 0; i < businessLogic.movies.length; i++){
		if(businessLogic.movies[i].Id == id){
			let obj = businessLogic.movies[i];
			res.send(obj);
			flag = false;
			break;
		}
	}
	if(flag){
		let obj = {"message" : "No such movie with ID:" + id};
		res.send(obj);
	}

});


app.get("/people/:Id", function(req, res, next){
	let id = req.params.Id;
	let flag = true;
	for(let i = 0; i < businessLogic.persons.length; i++){
		if(businessLogic.persons[i].Id == id){
			let obj = businessLogic.persons[i];
			res.send(obj);
			flag = false;
			break;
		}
	}
	if(flag){
		let obj = {"message" : "No such person with ID:" + id};
		res.send(obj);
	}

});


app.get("/people", function(req, res, next){
	let people = [];

	if(!("name" in req.query)){
		res.send(businessLogic.persons);
	}
	else{
		for(let i = 0; i < businessLogic.persons.length; i++){
			if(req.query.name.toLowerCase() == businessLogic.persons[i].Name.toLowerCase()){
				people.push(businessLogic.persons[i]);
			}
		}
		res.send(people);
	}

});


app.get("/users", function(req, res, next){
	let users = [];

	if(!("name" in req.query)){
		res.send(businessLogic.users);
	}
	else{
		for(let i = 0; i < businessLogic.users.length; i++){
			if(req.query.name.toLowerCase() == businessLogic.users[i].Username.toLowerCase()){
				users.push(businessLogic.users[i]);
			}
		}
		res.send(users);
	}

});


app.get("/users/:Id", function(req, res, next){
	let id = req.params.Id;
	let flag = true;
	for(let i = 0; i < businessLogic.users.length; i++){
		if(businessLogic.users[i].Id == id){
			let obj = businessLogic.users[i];
			res.send(obj);
			flag = false;
			break;
		}
	}
	if(flag){
		let obj = {"message" : "No such user with ID:" + id};
		res.send(obj);
	}

});



//*************************Functions************************************ */

function respondHome(req, res, next){
		res.render("sign",{});
}




//Listening to port port
app.listen(3000);
console.log("Server listening at http://localhost:3000");
