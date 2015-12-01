define(["jquery", "lodash", "omdb-ajax"], function($, _, omdbAjax) {
  return function(uid) {

// click find button in Find Movies Modal
    $("#searchSubmit").click(function () {

      $("#home-page .row").html("");

      var combinedMovies;
      var alphaMovies;
      var read = false;

// findMovie is set to value of input field
      var findMovie = $("#search").val();
      console.log("findmovie initial", findMovie);

// replace spaces in findMovie and set to lowercase
      var correctedMovie = findMovie.toLowerCase().replace(/ /g, "+");
      console.log("findMovie lowercase and replace", correctedMovie);

// put correctedMovie into javascripts/omdb-ajax.js then returns that promise to handlebars to write the responses
      omdbAjax(correctedMovie).then(function (movie) {


        $("#search").val("");
      console.log("movie", movie);

// creates arrays to put movies in that posters and no posters
      var posterList = [];
      var noPosterList = [];

      for (var z =0; z < movie.Search.length; z++) {
        if (movie.Search[z].disabled) {
          movie.Search.splice(z, 1);
        }
      }


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
// sort by Title function
        function compare(a,b) {
          if (a.Title < b.Title)
            return -1;
          if (a.Title > b.Title)
            return 1;
          return 0;
        }

// snapshot
      // var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles/" + uid + "/movies/");
      var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles");
      console.log("ref", ref);
      // console.log("ref.movies", ref.movies);
      ref.child(uid).on("value", function(snapshot) {

        // $("#home-page .row").html("");

// creates object of stored firebase movies
        var firebaseMoviesObject = snapshot.child("movies").val();

// this if statement is for a new user
        if (firebaseMoviesObject === null) {
          console.log("firebaseMoviesObject is null");
          // posterList.concat(noPosterList);
          combinedMovies = posterList.concat(noPosterList);
          alphaMovies = combinedMovies.sort(compare);

            // loops over combined movies and if Poster is "N/A", sets it to false.  it does this so handlebars will recognize it
          for (var m = 0; m < alphaMovies.length; m++) {
            if (alphaMovies[m].Poster === "N/A") {
              alphaMovies[m].Poster = false;
              console.log("poster is false", alphaMovies[m]);
            }
          }

          console.log("posterList", posterList);
          require(['hbs!../templates/unadded-poster'], function (unaddedPoster) {
            $("#home-page .row").html(unaddedPoster({movie: alphaMovies}));
          });

        } else {

          console.log("movie.Search.Title", movie.Search[0].Title);

  // converts object to array
          var firebaseMoviesArray = $.map(firebaseMoviesObject, function(el) { return el; });
          console.log("firebaseMoviesArray", firebaseMoviesArray);

  // filters array of firebase movies based on what has been searched for
          var filteredArray = _.filter(firebaseMoviesArray, function (obj) {
            if (_.includes(obj.Title.toLowerCase(), findMovie.toLowerCase())) {
              console.log("obj includes", obj.Title);
              return obj;
            }
          });

          console.log("firebaseMoviesArray after filter", filteredArray);

          var testArray = [];

          console.log("testArray", testArray);

  // concatenates posterList and noPosterList into filteredArray
          combinedMovies = filteredArray.concat(posterList, noPosterList);

          console.log("combinedMovies, since by reference should be same as sorted", combinedMovies);


  // filter unique movies from combinedMovies
          var uniqueMovies = _.uniq(combinedMovies, "imdbID");
          console.log("uniqueMovies", uniqueMovies);

  // sorts combinedMovies by Title key
          alphaMovies = uniqueMovies.sort(compare);
          console.log("combinedMovies after sort", alphaMovies);


          for (var y =0; y < alphaMovies.length; y++) {
            if (alphaMovies[y].disabled) {
              alphaMovies.splice(y, 1);
            }
          }



  // loops over combined movies and if Poster is "N/A", sets it to false.  it does this so handlebars will recognize it
          for (var k = 0; k < alphaMovies.length; k++) {
            if (alphaMovies[k].Poster === "N/A") {
              alphaMovies[k].Poster = false;
              console.log("poster is false", alphaMovies[k]);
            }
          }
        require(['hbs!../templates/unadded-poster'], function (unaddedPoster) {
            $("#home-page .row").html(unaddedPoster({movie: alphaMovies}));
          });
        }
      });
      
    });
});


  }; //--end return  
}); //--end define