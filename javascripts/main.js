define(["jquery", "hbs", "lodash", "firebase", "hbs/handlebars", "register-promise", "login-promise", "omdb-search", "add-movie", "firebase-search", "two-base-search", "omdb-title-ajax", "filter"], function($, handlebars, _, firebase, hbsFull, registerPromise, loginPromise, omdbSearch, addMovie, firebaseSearch, twoBaseSearch, omdbTitleAjax, filter) {

	// Set variables
	var email;
	var password;
	var login = $("#login");
	var logout = $("#logout");
	var register = $("#register");
	var searching = $("#searchSubmit");
	var thisUser = {};
	var uid;


	// click on register and grab values from fields and then pass them to registerPromise
	register.click(function() {
		email = $("#email").val();
		console.log(email);
		password = $("#password").val();
		console.log(password);


	// register new user. this does not log them in so we'll need to prevent them from continuing
	// we should also add in an alert or something that says they have been registered and now they can log in
		registerPromise(email,password);
	});


	// click on login and grab the values and pass them into loginPromise
	login.click(function() {
		email = $("#email").val();
		password = $("#password").val();
      var nextPage = $(this).attr("next");

    // pass in email and password to loginPromise, then use that authData to get uid to use in firebase
    loginPromise(email, password).then(function (authData) {
      uid = authData.uid;
      console.log("loginPromise then statement", uid);
      $("#greeting").html("Hello User!");
      $(".page").hide();
      $("." + nextPage).show();
			// javascripts/add-movie.js
			addMovie(uid);
// get movies from that user's firebase
			filter(uid);

			twoBaseSearch(uid);
		});
	});


	// search omdb with javascripts/omdb-search.js
	// omdbSearch();


	// Page turning from home screen to main page
    $("#entry-screen").show();
    
    $(".page-turn").click(function() {
      var nextPage = $(this).attr("next");

      $(".page").hide();
      $("." + nextPage).show();
    });

   
	// Enter for login button
    $(document).keyup(function (e) {
    	var test1 = $("#entry-screen").is(":visible");
        var key = e.which || e.keyCode;
            if (key === 13 && test1) {
            login.click();
          }
    });


    // Enter for search box
    $(document).keyup(function (e) {
    	var test2 = $(".main-page").is(":visible"); 
        var key = e.which || e.keyCode;
            if (key === 13 && test2) {
            searching.click();
          }
    });


    // Pull poster data on click and activate and populate modal
    $(document).on("click", ".movieCast", function(e)  {
		var movieID = this.id;

		omdbTitleAjax(movieID).then(function(movieData) {

			require(['hbs!../templates/movieInfoModal'], function (movieTemplate) {
          	$(".movieInfo").html(movieTemplate(movieData));
        	});
		});
	});

// when this was uncommented out then the first Add click would not register with firebase, but would affect the DOM
	// Click on add button, changes to watched button
	// $(document).on("click", ".add", (function(e) {
	// 	$(e.target).replaceWith("<button class='watch btn btn-primary' data-toggle='modal' data-target='#starRatingModal'>Watched?</button>").blur();
	// 	console.log("uid", uid);
	// 	addMovie(uid);
	// }));


	// Click on watched button, changes to star ratings
	$(document).on("click", ".watch", (function(e) {
		$(e.target).blur();
	}));


	// Star rating modal
	$(':radio').change(
	  function(){
	    $('.choice').text( this.value + ' stars!' );
	  } 
	);


    // Remove poster from results on click
	$(document).on("click", ".closeButton", function(e)  {

		var thing = $(e.target).next().attr("id");
		var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles/" + uid + "/movies");
		ref.on("value", function(snapshot) {
		  var userMovie = snapshot.val();
		 
		  for (var key in userMovie) {

		  		if (userMovie[key].imdbID === thing) {
		  			var selection = key;
		  			var secondRef = new Firebase("https://originalidea.firebaseio.com/userprofiles/" + uid + "/movies/" + selection);
		  			secondRef.remove();
				  	//delete movie  - ref.remove();
		  		}
		  }
		}, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});
		thing = "";
		e.target.parentNode.remove();
	});


	// Logout user
    logout.click(function() {
    	var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles/uid/movies");

    	ref.unauth();
    	location.reload();
    });

	// 	});
	// });

});