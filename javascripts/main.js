define(["jquery", "hbs", "lodash", "firebase", "hbs/handlebars", "register-promise", "login-promise"], function($, handlebars, _, firebase, hbsFull, registerPromise, loginPromise) {

	
	var email;
	var password;
	var login = $("#login");
	var register = $("#register");
	var thisUser = {};

	register.click(function() {
		email = $("#email").val();
		console.log("register email", email);
		password = $("#password").val();
		console.log("register password", password);

		// thisUser.email = email;
		// thisUser.password = password;

		// registerPromise(thisUser);
		registerPromise(email, password);
	});

	login.click(function() {
		email = $("#email").val();
		console.log("login email", email);
		password = $("#password").val();
		console.log("login password", password);

		loginPromise(email, password);
	});




	$(".page").hide();
    $("#entry-screen").show();
    
    $(".page-turn").click(function(e) {
      var nextPage = $(this).attr("next");

      $(".page").hide();
      $("." + nextPage).show();

    });



});