define(["jquery", "omdb-ajax"], function($, omdbAjax) {
  return function(uid) {

// click find button in Find Movies Modal
    $("#searchButton").click(function () {

// findMovie is set to value of input field
      var searchMovie = $("#search").val();
      console.log("findmovie initial", searchMovie);

// replace spaces in findMovie and set to lowercase
      var correctedMovie = searchMovie.toLowerCase().replace(/ /g, "+");
      console.log("findMovie lowercase and replace", correctedMovie);

      var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles/");
      console.log("ref", ref);

      ref.child(uid).on("value", function(snapshot) {

// Store the entire user key in a local variable
        var userRef = snapshot.val();
        console.log("inside userRef", userRef);


        require(['hbs!../templates/firebase-movie-results'], function (songTemplate) {
          $("#home-page .row").html(songTemplate({movies:userRef}));
        });

      });



// // put findMovie into ajax call to omdb ?     
//       omdbAjax(correctedMovie).then(function (movie) {

//       console.log("movie", movie);
// // handlebars    
//       require(['hbs!../templates/omdb-movie-results'], function (songTemplate) {
//         $("#home-page .row").html(songTemplate(movie));
//       });


//     });

    }); //--end click

  }; //--end return  
}); //--end define