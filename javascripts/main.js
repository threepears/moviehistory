define(["jquery", "hbs", "lodash", "firebase", "hbs/handlebars", "register-promise", "login-promise", "omdb-search", "add-movie"], function($, handlebars, _, firebase, hbsFull, registerPromise, loginPromise, omdbSearch, addMovie) {

	
	var email;
	var password;
	var login = $("#login");
	var register = $("#register");
	var thisUser = {};
	var uid;

	register.click(function() {
		email = $("#email").val();
		console.log(email);
		password = $("#password").val();
		console.log(password);

		/*thisUser.email = email;
		thisUser.password = password;*/

		registerPromise(email,password);
	});

	login.click(function() {
		email = $("#email").val();
		console.log(email);
		password = $("#password").val();
		console.log(password);

		loginPromise(email, password).then(function (authData) {
			uid = authData.uid;
			console.log("loginPromise then statement", uid);
			addMovie(uid);
			// return uid;
		});

	});


omdbSearch();

	$(".page").hide();
    $("#entry-screen").show();
    
    $(".page-turn").click(function(e) {
      var nextPage = $(this).attr("next");

      $(".page").hide();
      $("." + nextPage).show();

    });



});