define(["jquery", "hbs", "lodash", "firebase", "hbs/handlebars", "register-promise", "login-promise"], function($, handlebars, _, firebase, hbsFull, registerPromise, loginPromise) {

	
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

		thisUser.email = email;
		thisUser.password = password;

		registerPromise(thisUser);
	});

	login.click(function() {
		email = $("#email").val();
		console.log(email);
		password = $("#password").val();
		console.log(password);

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