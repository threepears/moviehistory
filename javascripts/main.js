define(["jquery", "hbs", "lodash", "firebase", "hbs/handlebars", "register-promise", "login-promise", "omdb-search", "add-movie", "firebase-search"], function($, handlebars, _, firebase, hbsFull, registerPromise, loginPromise, omdbSearch, addMovie, firebaseSearch) {

	
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
		console.log(email);
		password = $("#password").val();
		console.log(password);

// pass in email and password to loginPromise, then use that authData to get uid to use in firebase
		loginPromise(email, password).then(function (authData) {
			uid = authData.uid;
			console.log("loginPromise then statement", uid);
			$("#greeting").html("Hello User!");
// javascripts/add-movie.js
			addMovie(uid);
			firebaseSearch(uid);
			// return uid;
		});

	});


	// search omdb with javascripts/omdb-search.js
	omdbSearch();


    $("#entry-screen").show();
    
    $(".page-turn").click(function(e) {
      var nextPage = $(this).attr("next");

      $(".page").hide();
      $("." + nextPage).show();

    });

    // Autofocus for modal
/*    $('#findMovies').click(function () {
  		$('#find').focus();
	});*/


    // Enter
    $(document).keyup(function (e) {
        var key = e.which || e.keyCode;
            if (key === 13) {
            searching.click();
            /*e.preventDefault();*/
/*            omdbSearch();*/
          }
    });


	$(document).on("click", ".closeButton", function(e)  {
		console.log("Clicking");
/*		var artist = $(this).parent().find("li")[0].innerHTML;
*/		e.target.parentNode.remove();

	});



    logout.click(function() {
    	var ref = new Firebase("https://originalidea.firebaseio.com");

    	ref.unauth();
    	location.reload();
    });



});