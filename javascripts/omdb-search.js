define(["jquery", "omdb-ajax"], function($, omdbAjax) {
  return function() {

// click find button in Find Movies Modal
    $("#modal-find-button").click(function () {

// findMovie is set to value of input field
      var findMovie = $("#modal-find-input").val();
      console.log("findmovie initial", findMovie);

// replace spaces in findMovie and set to lowercase
      findMovie.toLowerCase().replace(/" "/g, "+");
      console.log("findMovie lowercase and replace", findMovie);

// put findMovie into ajax call to omdb ?     
      omdbAjax(findMovie).then(function () {

// handlebars ?     

        
      });


    });



  }; //--end return  
}); //--end define