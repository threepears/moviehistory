define(["jquery", "firebase", "q", "generalVariables"],
function ($, firebase, Q, generalVariables) {

  return function(){

    console.log("populate user movies");

    //deferred object for promise
    var deferred = Q.defer();
    
        console.log("user object: ", generalVariables.getCurrentUserMovies());


      //populate page with user movies
      require(["hbs!../templates/searchMovies"], function(popusermovies){
                  $("middle page-turn btn btn-primary btn-lg").html(popusermovies(generalVariables.getCurrentUserMovies()));

                  deferred.resolve();
             });

    return deferred.promise;
  }
  
})








//when log in submit button is clicked, check user authentication, and if successful, populate page with main.hbs
      $("body").on("click", "#logInSubmit", function(){
            loginAuth()
        .then(function(){
          console.log("I am HERE!");
      //after user is logged in, populate page with main.hbs  need to call cbs database to display user specific database info /// 
        allSearchFunctionality()

        require(["hbs!../templates/main"], function(logInTemplate){
                  $("#mainContainer").html(logInTemplate()); 
                });

        console.log("user object: ", generalVariables.getCurrentUser());
      });
      });


