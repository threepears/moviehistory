define(["jquery", "omdb-ajax"], function($, omdbAjax) {
  return function() {

// click find button in Find Movies Modal
    $("#findButton").click(function () {

// findMovie is set to value of input field
      var findMovie = $("#find").val();
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

      for (var key in movie) {
        console.log(movie.Search);
    
      }

      console.log(Object.keys(movie));


      require(['hbs!../templates/omdb-movie-results'], function (songTemplate) {
        $("#home-page .row").html(songTemplate(movie));
      });


    });

});

  }; //--end return  
}); //--end define