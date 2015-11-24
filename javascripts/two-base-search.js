define(["jquery", "lodash", "omdb-ajax"], function($, _, omdbAjax) {
  return function(uid) {

// click find button in Find Movies Modal
    $("#searchSubmit").click(function () {

      $("#home-page .row").html("");

      var combinedMovies;

// findMovie is set to value of input field
      var findMovie = $("#search").val();
      console.log("findmovie initial", findMovie);

// replace spaces in findMovie and set to lowercase
      var correctedMovie = findMovie.toLowerCase().replace(/ /g, "+");
      console.log("findMovie lowercase and replace", correctedMovie);

// put correctedMovie into javascripts/omdb-ajax.js then returns that promise to handlebars to write the responses
      omdbAjax(correctedMovie).then(function (movie) {

      console.log("movie", movie);

// creates arrays to put movies in that posters and no posters
      var posterList = [];
      var noPosterList = [];

// loops over the search results from omdb and pushes movies with no posters into no posters array. likewise with movies with posters
      for (var i = 0; i < movie.Search.length; i++) {
        if (movie.Search[i].Poster !== "N/A") {
          posterList.push(movie.Search[i]);
        } else {
          noPosterList.push(movie.Search[i]);
        }
      }

      console.log("posterList", posterList);
      console.log("noPosterList", noPosterList);


/////////////////

// snapshot
      // var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles/" + uid + "/movies/");
      var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles");
      console.log("ref", ref);
      // console.log("ref.movies", ref.movies);
      ref.child(uid).on("value", function(snapshot) {

        $("#home-page .row").html("");

// Store the entire user key in a local variable

// creates object of stored firebase movies
        var firebaseMoviesObject = snapshot.child("movies").val();


// we need a way to combine the omdb and firebase results and alphabetize them
// while still writing the ones without posters to have a title displayed

// converts object to array
        var firebaseMoviesArray = $.map(firebaseMoviesObject, function(el) { return el; });
        var testArray = [];
        for (var j = 0; j < firebaseMoviesArray.length; j++) {
          if (firebaseMoviesArray[j].Title == findMovie) {
            testArray.push(firebaseMoviesArray[j]);
          }
        }
        console.log("testArray", testArray);

        console.log("inside firebaseMoviesObject", firebaseMoviesObject);
        console.log("firebaseMoviesArray", firebaseMoviesArray);

// combines that array with posterList and noPosterList from above
        // combinedMovies = firebaseMoviesArray.concat(posterList, noPosterList);
        combinedMovies  = testArray.concat(posterList, noPosterList);

        console.log("combinedMovies, since by reference should be same as sorted", combinedMovies);

// sort by Title function
        function compare(a,b) {
          if (a.Title < b.Title)
            return -1;
          if (a.Title > b.Title)
            return 1;
          return 0;
        }

// filter unique movies from combinedMovies
        var uniqueMovies = _.uniq(combinedMovies, "imdbID");
        console.log("uniqueMovies", uniqueMovies);

// sorts combinedMovies by Title key
        var alphaMovies = uniqueMovies.sort(compare);
        console.log("combinedMovies after sort", alphaMovies);


// loops over combined movies and if Poster is "N/A", sets it to false.  it does this so handlebars will recognize it
        for (var k = 0; k < alphaMovies.length; k++) {
          if (alphaMovies[k].Poster === "N/A") {
            alphaMovies[k].Poster = false;
            console.log("poster is false", alphaMovies[k]);
          }
        }

// prints to DOM. unadded-poster should be changed to be more semantically correct, baby!
        require(['hbs!../templates/unadded-poster'], function (unaddedPoster) {
          $("#home-page .row").append(unaddedPoster({movie: alphaMovies}));
        });


        // for (var k = 0; k < combinedMovies.length; k++) {
        //   if (combinedMovies[k].Poster === "N/A") {
        //     console.log("combinedMovies[k] no poster", combinedMovies[k]);
        //     require(['hbs!../templates/unadded-no-poster'], function (unaddedNoPoster) {
        //       $("#home-page .row").append(unaddedNoPoster(combinedMovies[k]));
        //     });
        //   } else if (combinedMovies[k].Poster !== "N/A") {
        //     console.log("combinedMovies[k] has poster", combinedMovies[k]);
        //     require(['hbs!../templates/unadded-poster'], function (unaddedPoster) {
        //       $("#home-page .row").append(unaddedPoster(combinedMovies[k]));
        //     });
        //   }



        //   // if (combinedMovies[k].Poster === "N/A") {
        //   //   require(['hbs!../templates/omdb-movie-results'], function (songTemplate) {
        //   //     $("#home-page .row").append(songTemplate(combinedMovies[k]));
        //   //   });
        //   // }
        // }


// writes to dom
        // require(['hbs!../templates/omdb-movie-results'], function (songTemplate) {
        //   $("#home-page .row").html(songTemplate({Search:combinedMovies}));
        //   combinedMovies = [];
        //   firebaseMoviesArray = [];
        // });
      });



// // currently this also writes the email address that is stored at the same level as the movies.
// // that could be fixed or changed several ways i'm sure
//         // require(['hbs!../templates/firebase-movie-results'], function (songTemplate) {
//         //   // $("#home-page .row").html(songTemplate({movies:userRef}));
//         //   $("#home-page .row").html(songTemplate(userRef));
//         // });
//       });

        // ref.orderByChild("Title").on("value", function(snapshot) {
        //   console.log(snapshot.val().movies.Title);
        // });





/////////////////

// writes each to the page
      // require(['hbs!../templates/omdb-movie-results'], function (songTemplate) {
      //   $("#home-page .row").append(songTemplate({Search:posterList}));
      // });


      // require(['hbs!../templates/omdb-noposter-results'], function (songTemplate) {
      //   $("#home-page .row").append(songTemplate({Search:noPosterList}));
      // });

      // console.log(Object.keys(movie));

    });

});

  }; //--end return  
}); //--end define