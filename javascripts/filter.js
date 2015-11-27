define(["jquery", "lodash", "firebase-get-ajax"], function($, _, firebaseGetAjax) {
  return function(uid) {

// promise that gets uid's movies from firebase via log-in
  	firebaseGetAjax(uid).then(function (movies) {

  		var unwatchedMovies =[];
  		var watchedMovies = [];
  		var favoriteMovies = [];

  		console.log("movies from filter, gets info from firebaseGetAjax", movies);

// turns object of objects into array of objects
  		var firebaseMoviesArray = $.map(movies, function(el) { return el; });
  		console.log("firebaseMoviesArray", firebaseMoviesArray);

// sort by Title function
        function compare(a,b) {
          if (a.Title < b.Title)
            return -1;
          if (a.Title > b.Title)
            return 1;
          return 0;
        }

// sorts firebase movies by Title key, alphabetizes them
        var alphaFirebaseMovies = firebaseMoviesArray.sort(compare);
        console.log("alphaFirebaseMovies", alphaFirebaseMovies);

// loops over alphabetized firebase movies and if Poster is "N/A", sets it to false.  it does this so handlebars will recognize it
        for (var k = 0; k < alphaFirebaseMovies.length; k++) {
          if (alphaFirebaseMovies[k].Poster === "N/A") {
            alphaFirebaseMovies[k].Poster = false;
            console.log("poster is false", alphaFirebaseMovies[k]);
          }
        }

// loops over alphabetized firebase movies and pushes unwatched movies and watched movies into separate arrays
        for (var i = 0; i < alphaFirebaseMovies.length; i++) {
        	if (alphaFirebaseMovies[i].watched === false) {
        		unwatchedMovies.push(alphaFirebaseMovies[i]);
        	} else if (alphaFirebaseMovies[i].watched === true) {
        		watchedMovies.push(alphaFirebaseMovies[i]);
        	} 
        }

// loops over alphabetized firebase movies and pushes movies with a rating of 5 into favorite movies array
        for (var j = 0; j < alphaFirebaseMovies.length; j++) {
        	if (alphaFirebaseMovies[j].rating === 5) {
        		favoriteMovies.push(alphaFirebaseMovies[j]);
        	}
        }

        console.log("unwatchedMovies", unwatchedMovies);
        console.log("watchedMovies", watchedMovies);
        console.log("favoriteMovies", favoriteMovies);


// initially populates page once you log in
        require(['hbs!../templates/unadded-poster'], function (handlebars) {
          $("#home-page .row").html(handlebars({movie: alphaFirebaseMovies}));
        });


// click All button to display all firebase movies
			$("#allButton").click(function () {
			  require(['hbs!../templates/unadded-poster'], function (handlebars) {
			    $("#home-page .row").html(handlebars({movie: alphaFirebaseMovies}));
			  });
			});

// click Unwatched button to display unwatched firebase movies
			$("#unwatchedButton").click(function () {
			  require(['hbs!../templates/unadded-poster'], function (handlebars) {
			    $("#home-page .row").html(handlebars({movie: unwatchedMovies}));
			  });
			});

// click Watched button to display watched firebase movies
			$("#watchedButton").click(function () {
			  require(['hbs!../templates/unadded-poster'], function (handlebars) {
			    $("#home-page .row").html(handlebars({movie: watchedMovies}));
			  });
			});

// click Favorites button to display favorites firebase movies with rating of 5
			$("#favoritesButton").click(function () {
			  require(['hbs!../templates/unadded-poster'], function (handlebars) {
			    $("#home-page .row").html(handlebars({movie: favoriteMovies}));
			  });
			});



  	});
  };	
});