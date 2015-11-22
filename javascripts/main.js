define(["jquery", "hbs", "lodash", "firebase", "hbs/handlebars", "register-promise", "login-promise", "omdb-search", "add-movie"], function($, handlebars, _, firebase, hbsFull, registerPromise, loginPromise, omdbSearch, addMovie) {

	
	var email;
	var password;
	var login = $("#login");
	var register = $("#register");
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
// javascripts/add-movie.js
			addMovie(uid);
			// return uid;
		});

	});

// search omdb with javascripts/omdb-search.js
omdbSearch();

	$(".page").hide();
    $("#entry-screen").show();
    
    $(".page-turn").click(function(e) {
      var nextPage = $(this).attr("next");

      $(".page").hide();
      $("." + nextPage).show();

    });



});