define(["jquery", "q", "firebase"], function($, Q, firebase) {

	return {

		login: function(email, password) {

			var deferred = Q.defer();

			var ref = new Firebase("https://https://originalidea.firebaseio.com");
			ref.authWithPassword({
			  email    : email,
			  password : password
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			  } else {
			  	deferred.resolve(authData);
			    console.log("Authenticated successfully with payload:", authData);
			  }
			});
			return deferred.promise;


		}

	};

});