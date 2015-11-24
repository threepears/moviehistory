define(["jquery", "omdb-ajax"], function($, omdbAjax) {
  return function() {

// click find button in Find Movies Modal
    $("#searchSubmit").click(function () {

      $("#home-page .row").html("");

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

// writes each to the page
        require(['hbs!../templates/omdb-movie-results'], function (songTemplate) {
          $("#home-page .row").append(songTemplate({Search:posterList}));
        });

        require(['hbs!../templates/omdb-noposter-results'], function (songTemplate) {
          $("#home-page .row").append(songTemplate({Search:noPosterList}));
        });

      // console.log(Object.keys(movie));

    });

});

  }; //--end return  
}); //--end define