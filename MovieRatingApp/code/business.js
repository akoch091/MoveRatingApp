//This will be our database for now
let movies = require("./movies/movie.json");
let persons = require("./persons/person.json");
let users = require("./users/user.json");
let reviews = require("./reviews/review.json");
let config = require("./config.json");


//testing data structure
//console.log("Movies in the database:");
//console.log(movies);
//console.log("Persons in the database:");
//console.log(persons);
//console.log("Users in the database:");
//console.log(users);
//console.log("Config settings:");
//console.log(config);
//console.log(config.nextReviewID);


//business logic code/functions

//-------------------validation functions (to check if items/objects in DB)--------------------------

//functin to check if a user exists in DB.
function doesUserExist(newUser) {
	for(i=0; i<users.length; i++){
		if(newUser.Username === users[i].Username){
			return true;
		}
	}
	return false;
}

//testing function
//console.log(doesUserExist(users[1]));                //-> true since we have that user
//console.log(doesUserExist({Username:"bumblebee"})); //-> false since we have that user

//function to authenticate a user
function authenticate(uname, pword) {
	//console.log(uname + pword);
	for(i=0; i<users.length; i++){
		//console.log(users[i]);
		
		if(uname === users[i].Username && pword === users[i].Password){
			return 1; //authentication code indicating that can be logged in
		}
		else if(uname === users[i].Username && pword !== users[i].Password){
			return 2; //authentication code indicating that wrong password was entered
		}
	}
	return 3; ////authentication code indicating that not a member and needs to sign up
}

//testing function
//console.log(authenticate("usr1", "usr1"));      //-> 1 authentication code indicating that can be logged in
//console.log(authenticate("usr1", "usr2"));     //-> 2 authentication code indicating that wrong password was entered
//console.log(authenticate("usr4", "usr2"));    //-> 3 authentication code indicating that not a member and needs to sign up

//function to check if person exists in DB
function doesPersonExist(person) {
	for(i=0; i<persons.length; i++){
		if(person.Name === persons[i].Name){
			return true;
		}
	}
	return false;	
}

//testing function
//console.log(doesPersonExist(persons[0]));          //-> true since we have that person
//console.log(doesPersonExist({Name:"Joe Rogan"})); //-> false since we dont have that person

function doesMovieExist(movie) {
	for(i=0; i<movies.length; i++){
		if(movie.Title === movies[i].Title){
			return true;
		}
	}
	return false;
}

//testing function
//console.log(doesMovieExist(movies[0]));                            //-> true since we have that movie
//console.log(doesMovieExist({Title:"The Last of the Mohicans"}));    //-> false since we dont have that movie

//------------------------------------------------------------------------------------------------------------

//-------------------functions regular users will need--------------------------------------------------------

function createUser(newUser){
	//check validity of name and password
	if(newUser.Username === null || newUser.Password === null){
		return null;
	}
	if(doesUserExist(newUser)){
		return null;
	}
	//create the new account
	let User = {
		Id: config.nextUserID,
		Username: newUser.username,
		Password: newUser.password,
		Type : "regular",
		PeopleFollow : [],
		UsersFollow : [],
		Reviews : [],
		RecommendedMovies :[]
		
		};
	
	
	//add the new user to the array
	users.push(User);
	config.nextUserID++;
}

//testing the function
//console.log("Users in the database:");
//console.log(users);
//console.log("adding to the DB");
//createUser({username: "crazy_MovieGuy", password: "abracadabra"});
//console.log(users);



//function to change type (from a regular user to contributing)
function setUserAccountType(user, t){
	if(t === "contributing" || t === "regular"){
		user.Type = t;
	}
	else{
		return null;
	}
}

//testing the function
//console.log("Users in the database:");
//console.log(users);
//setUserAccountType(users[1], "regular")
//console.log("changing usr2 account type from contributing to regular");
//console.log(users);


//function for a user to follow an actor/writer/director
function followPerson(user, person){
	if(doesPersonExist(person)){
		if(!user.PeopleFollow.includes(person.Name)){
			user.PeopleFollow.push(person.Name);	
		}
	}
}

//testing the function
//console.log("Users in the database:");
//console.log(users);
//console.log("Usr1 starts following Seth Rogan");
//followPerson(users[0], persons[0]); //-> adds seth rogan to usr1 followers
//followPerson(users[0], persons[0]); //-> shouldnt be able to add twice
//console.log(users);


//a function to unfollow the person
function unFollowPerson(user, person){
	if(doesPersonExist(person)){
		for(i=0; i<user.PeopleFollow.length; i++){
			if(user.PeopleFollow[i] === person.Name){
				user.PeopleFollow.splice(i, 1);
			}
		}
	}
}

//testing the function
//console.log("Users in the database:");
//console.log(users);
//unFollowPerson(users[0], persons[2]); //usr1 unfollows judd Apatow
//console.log("usr1 should not have Judd Apatow anymore in the follow people list");
//console.log(users);

/*
testing the splice function
let a = [1, 2, 3, 5, 8, 9];
a.splice(2,1);
console.log(a);
console.log(users[0].PeopleFollow);
users[0].PeopleFollow.splice(0,1);
console.log(users[0].PeopleFollow);
*/

//function for a user to follow another user (user1 will follow user2)
function followUser(user1, user2){
	if(doesUserExist(user1) && doesUserExist(user2)){
		if(!user1.UsersFollow.includes(user2.Username)){
			user1.UsersFollow.push(user2.Username);	
		}
	}
}

//testing the function
//console.log("Users in the database:");
//console.log(users);
//console.log("Usr1 starts following usr3");
//followUser(users[0], users[2]); //-> adds usr3 to usr1 followers
//followUser(users[0], users[1]); //-> shouldnt be able to add twice
//console.log(users);



//a function to unfollow another user (user1 unfollows user2)
function unFollowUser(user1, user2){
	if(doesUserExist(user1) && doesUserExist(user2)){
		for(i=0; i<user1.UsersFollow.length; i++){
			if(user1.UsersFollow[i] === user2.Username){
				user1.UsersFollow.splice(i, 1);
			}
		}
	}
}


//testing the function
//console.log("Users in the database:");
//console.log(users);
//unFollowUser(users[2], users[1]); //usr3 unfollows user2
//console.log("usr3 should not be following usr2 anymore");
//console.log(users);

//function to handle leaving a review about he movie.
function leaveShortReview(user, movie, s, st, lt){
	
	if(doesUserExist(user) && doesMovieExist(movie)){
		let review = {Id:config.nextReviewID, User:user.Username, Movie:movie.Title, Score: s, ShoRev: st, LenRev: lt};

		for (let i = 0; i < movies.length; i++){
			if (movie.Id === movies[i].Id){
				movies[i].Reviews.push(review);
			}
		}
		for (let i = 0; i < users.length; i++){
			if (users[i].Username === user.Username){
				users[i].Reviews.push(review)
			}
		}

		user.Reviews.push(review);
		config.nextReviewID++;
	}
}


//testing the function
//console.log("'This is 40' movie information");
//console.log(movies[2]);
//console.log("usr3 is adding a short review to 'This is 40'.");
//leaveShortReview(users[2], movies[2], 6, "Not impressed...", "Given the director and actors involved in this project, I expected a lot more.");
//console.log(movies[2]);
//console.log("'This is 40' recieved a review from usr3.");
//console.log("Database of reviews after update");
//console.log(reviews);

//A function to generate a list of all of the people this user has followed
function getPeopleFollow(user){
	if(doesUserExist(user)){
		return user.PeopleFollow;
	}
}
//testing the function
//console.log(getPeopleFollow(users[0])); //generate a list of people user1 follows

//----------------------------------------------------------------------------------------------------------------------------------------------------

//-------------------Search/find movies functions--------------------------------------------------------

//function to generate a list of similar movies, based on genre
function findSimMovies(movie){
	let result = []; 
	for(i=0; i<movies.length; i++){
		if(movies[i].Genre === movie.Genre && movies[i].Title !== movie.Title){
			result.push((movies[i].Title));
		}
	}
	return result;
}

//testing the function
//will generate a list with movies with same genre
//console.log(findSimMovies(movies[2])); //-> a similar movie to "This is 40" is "knocked up" (a comedy), which is what we will get in the list

//a function to find movies by title (could be multiple -> so in a list)
function findMoviesByTitle(movie){
	let result = []; 
	for(i=0; i<movies.length; i++){
		if(movies[i].Title === movie){
			result.push((movies[i]));
		}
	}
	return result;
}

//testing the function
//will generate a list with movies with same genre
//console.log(findMoviesByTitle("This is 40")); //-> will find and put in the list the movie 'This is 40'

//a function to find all the movies by genre
function findMoviesByGenre(genre){
	let result = []; 
	for(i=0; i<movies.length; i++){
		if(movies[i].Genre === genre){
			result.push((movies[i]));
		}
	}
	return result;
}

//testing the function
//will generate a list with movies with same genre
//console.log(findMoviesByGenre("comedy")); //-> will find and put in the list the movies 'This is 40' and 'Knocked Up'

//a function to find movies based on the people who made them (directors, actors, writers)
function findMoviesByName(name){
	let result = []; 
	for(i=0; i<movies.length; i++){
		if( movies[i].Stars.includes(name) || movies[i].Writer.includes(name) || movies[i].Director.includes(name) ){
			result.push((movies[i].Title));
		}
	}
	return result;
}

//testing the function
//will generate a list with movies with same genre
//console.log(findMoviesByName("Judd Apatow")); //-> will generate all the movies in the database(Jud is involved in all of them in the mini DB I created)

//----------------------------------------------------------------------------------------------------------------------------------------------------




//-------------------Some of the functions contributing users will need--------------------------------------------------------

//A function in which a user (contributing user) may add a new person to the DB
//since the specifications are asking to add a person just by name most of the other attributes will be missing
//in the future will need a function to edit a person in order to complete the missing fields
function addNewPerson(user, bodyObject){
	if(user.Type === "contributing"){
		for(i=0; i<persons.length; i++){
			if(persons[i].Name === bodyObject.name){ //if name is in the DB dont do anything
				return;
			}
		}
		let result = { Id: config.nextPersonID, Name: bodyObject.name, Bio: bodyObject.bio, Movies: [], Collaborators: [] }; //otherwise create a person object and add to the list
		persons.push(result);
		config.nextPersonID++;
	}
}


//testing the function
//console.log("persons database before addition of a new person");
//console.log(persons);
//addNewPerson(users[1], {name:"Brad Pitt"}) //user2, which is of type contributor is adding Brad Pitt to the DB -> should succeed
//addNewPerson(users[2], {name:"Bradley Cooper"}) //user3, which is of type regular is adding Bradley Cooper to the DB -> should not succeed
//console.log("persons database after addition of a new person(s)");
//console.log(persons);
//console.log(config);


//A function in which a user (contributing user) may add a new movie to the DB 
//since the specifications are asking to add a movie just by name most of the other attributes will be missing
//in the future will need a function to edit a movie in order to complete the missing fields
function addNewMovie(user, movie){
	if(user.Type === "contributing" && !doesMovieExist(movie)){
		
		let result = { Id: config.nextMovieID, Title: movie.title, ReleaseDate: movie.date, Genre: movie.genre, Stars: [movie.stars], Writer: [movie.writer], Director: [movie.director], Runtime: movie.runtime, Plot: movie.plot, AverageRating: 0, Reviews: [] }; //otherwise create a movie object and add to the list
		movies.push(result);

		let name = movie.director;
		let bio = "Bio of a director";
		let director = {name, bio};

		name = movie.stars;
		bio = "Bio of an actor";
		let actor = {name, bio};

		name = movie.writer;
		bio  = "Bio of a writer";
		let writer = {name, bio};

		addNewPerson(user, director);
		addNewPerson(user, actor);
		addNewPerson(user, writer);

		config.nextMovieID++;
	}		
	
}

//testing the function
//console.log("movies database before addition of a new person");
//console.log(movies);
//addNewMovie(users[1], { title: "Braveheart", date: "1995", stars: "Mel Gibson", writer: "Randall Wallace", director: "Mel Gibson", runtime: "173 min", plot: "Epic story of the struggle for Scotish independence"}) //user1, which is of type contributor is adding Braveheart to the DB -> should succeed
//addNewMovie(users[2], { title: "Rob Roy", date: "1995", stars: "Liam Neeson", writer: "Alan Sharp", director: "Michael Caton-Jones", runtime: "139 min"})  //user3, which is of type regular is adding RobRoy to the DB -> should not succeed
//console.log("movies database after addition of a new movie(s)");
//console.log(movies);

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

module.exports = {
	authenticate,
	createUser,
	addNewPerson,
	addNewMovie,
	leaveShortReview,
	users,
	persons,
	movies
}