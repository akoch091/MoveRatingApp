# MoveRatingApp
 A website that can be used to rate and review movies, leave comments and add other users as friends.


Name: Avetik Kocharyan
Student number: 100793437
Final submission/COMP2406

Movie Database project.
No partner.

OpenStack information:

Name of instance: Avetik91, password: student, IP address: 192.168.57.87,  134.117.133.91
code uploaded to ~/Public 

Folders included in this submission:

Inside the final submission folder (main folder for the project) you can find:

views folder:
	this folder contains all the pages for the project (pug templete engine was inplemented)

	. sign.pug --> default page for the movie website (images used for this page: bh.jpg, gf.jpg, insomnia.jpg, p.jpg, seven.jpg).
	. myuser.pug --> main user page once a user has logged in/signed up.
	. otheruser.pug --> a page for viweing other users in the website.
	. persons.pug --> page to display all the people in the website (artists).
	. movies.pug --> page to display all the movies in the website.
	. moviepage.pug --> page to view specific movies.
	. addMovie.pug --> page for a contributing user to add a movie.
	. addPerson.pug --> page for a contributing user to add a person.
	. addReview.pug --> page for adding reviews.
	. editmovie.pug --> page for editing a movie by adding more people.
	. personpage.pug --> page for a specific artist.
	. searchresult.pug --> page to view the search results.

	. bh.jpg -> image files
	. gf.jpg -> image files
	. insomnia.jpg -> image files
	. p.jpg -> image files
	. seven.jpg -> image files


	. signin.js -> script file for the sign.pug to deal client side of signup/sigin.
	. addMovieScript.js -> script file to add movie.
	. addPersonScript.js -> script file to add artist.
	. addreviewScript.js -> script file to add reviews.
	. editmovie.js -> script file to add reviews.	
	. usr.js      -> script file to handle user requests.
	. personpage.js -> script file to handle user requests from personpage page.
	. otheruser.js -> script file to handle user requests from otheruser page.
	. moviePage.js -> script file to handle user requests from moviepage page.

	

files:
	1. movie-server.js --> server code.
	2. business.js --> business logic code.	
	3. config.json --> additional data file (holding information about the number of movies, persons,... etc)
	4. package.json --> dependencies
	5. package-lock.json

	6. final project report
	7. readme

the data folders (movies, users, reviews, persons)
	Each of the folders contains a json file with an array of objects (movie.json, user.json, review.json and person.json respectively)

	

To run the server:

	CU learn on local computer:

	Before running the website (for culearn download only/ will try to set all these up in openstack myself):
	This website has the following dependancies which will need to be installed before node.js can host the server (please check package.jason file).
		-pugs (npm install pug)
		-express (npm install express)
		-sessions (npm install express-sessions)


	Please navigate to the appropriate directory and run node movie-server.js from the terminal.
	Copy/paste http://localhost:3000 into browser and test.

	
	OPENSTACK:

	Please navigate to the ~/Public/moviedbFinalKocharyan folder
	From the vm (name of VM on top of the page) terminal please enter: node movie-server.js
	From local computer perform shhMapping: ssh -L 3000:localhost:3000 student@134.117.133.91
	(important for local port to be 3000)
	Now, you should be able to connect http://localhost:3000 in a browser and test.


Running/testing the website:
	Please check the project report for detailed instructions on how to run and test the website.









Sources:
Relied heavily on the Workshops conducted by Bruce Fernandes.
Implemented some design concepts from the w3schools website.
https://www.youtube.com/watch?v=TLuijugSBUc (used and modified the code for the server)


Images obtained from google search:
bh.jpg -> http://www.mposter.com/braveheart-2-movie-poster.html
gf.jpg -> https://www.pinterest.ca/pin/115264071683515817/
insomnia.jpg -> http://www.impawards.com/2002/insomnia.html
p.jpg -> https://www.imdb.com/title/tt0253474/mediaviewer/rm902038272
seven.jpg -> https://www.pinterest.ca/pin/359865826448844177/
