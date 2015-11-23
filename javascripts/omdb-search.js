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

// put findMovie into ajax call to omdb ?     
      omdbAjax(correctedMovie).then(function (movie) {

// handlebars ?     
      console.log("movie", movie);

/*      for (var key in movie) {
        if(users[key].email === authData.password.email){
          signedInUserProfile = users[key];
        } else {
          otherUsers.push(users[key]);
        }
      }*/

      // for (var key in movie) {
      //   console.log(movie[key]);
      //   for (var i in key) {
      //     console.log(i);
      //   }
      // }

      console.log(Object.keys(movie));


      require(['hbs!../templates/omdb-movie-results'], function (songTemplate) {
        $("#home-page .row").html(songTemplate(movie));
      });


    });

});

  }; //--end return  
}); //--end define