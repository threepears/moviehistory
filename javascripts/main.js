define(["jquery", "hbs", "lodash", "firebase", "hbs/handlebars", "register-promise", "login-promise", "omdb-search"], function($, handlebars, _, firebase, hbsFull, registerPromise, loginPromise, omdbSearch) {

	
	var email;
	var password;
	var login = $("#login");
	var register = $("#register");
	var thisUser = {};

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

		loginPromise(email, password);
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