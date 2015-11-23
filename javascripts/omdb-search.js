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

/*      for (var key in movie) {
        if(users[key].email === authData.password.email){
          signedInUserProfile = users[key];
        } else {
          otherUsers.push(users[key]);
        }
      }*/

/*      for (var key in movie) {
        console.log(movie);
    
      }*/

      var posterList = [];
      var noPosterList = [];

        var count = 0;

        for (var i = 0; i < movie.Search.length; i++) {
          if (movie.Search[i].Poster !== "N/A") {
            posterList.push(movie.Search[i]);
          } else {
            noPosterList.push(movie.Search[i]);
          }
        }

        console.log("posterList", posterList);
        console.log("noPosterList", noPosterList);


        require(['hbs!../templates/omdb-movie-results'], function (songTemplate) {
          $("#home-page .row").append(songTemplate({Search:posterList}));
        });

        require(['hbs!../templates/omdb-noposter-results'], function (songTemplate) {
          $("#home-page .row").append(songTemplate({Search:noPosterList}));
        });






      // for (var i = 0; i < movie.Search.length; i++) {
      //   if (count > 0) {
      //     require(['hbs!../templates/omdb-noposter-results'], function (songTemplate) {
      //     $("#home-page .row").html(songTemplate({Search:movie}));
      //     });
      //   } else {
      //     require(['hbs!../templates/omdb-movie-results'], function (songTemplate) {
      //     $("#home-page .row").html(songTemplate({Search:movie}));
      //     });
      //   }
      // }
        

/*        console.log(newList)*/

      console.log(Object.keys(movie));

      // Search:movie creates a "Search" object and puts "movie" inside
/*      require(['hbs!../templates/omdb-movie-results'], function (songTemplate) {
        $("#home-page .row").html(songTemplate({Search:movie}));
      });*/


    });

});

  }; //--end return  
}); //--end define