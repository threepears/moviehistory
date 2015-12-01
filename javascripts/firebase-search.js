define(["jquery", "omdb-ajax"], function($, omdbAjax) {
  return function(uid) {

// click search button in Search Movies Modal
    $("#searchButton").click(function () {

// findMovie is set to value of input field (currently not being used)
      var searchMovie = $("#search").val();
      console.log("findmovie initial", searchMovie);

// replace spaces in findMovie and set to lowercase (this is code from the Find Movies button and will not work here)
      var correctedMovie = searchMovie.toLowerCase().replace(/ /g, "+");
      console.log("findMovie lowercase and replace", correctedMovie);

// snapshot
      var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles/");
      console.log("ref", ref);

      ref.child(uid).on("value", function(snapshot) {

// Store the entire user key in a local variable
        var userRef = snapshot.val();
        console.log("inside userRef", userRef);

// currently this also writes the email address that is stored at the same level as the movies.
// that could be fixed or changed several ways i'm sure
        require(['hbs!../templates/firebase-movie-results'], function (songTemplate) {
          // $("#home-page .row").html(songTemplate({movies:userRef}));
          console.log("userRef", userRef);
          $("#home-page .row").html(songTemplate(userRef));
        });
      });

// nothing happens after this, but something should be written to make that thing you want to happen, happen



    }); //--end click

  }; //--end return  
}); //--end define