define(["jquery", "q", "firebase"], function($, Q, firebase) {

	return {

		createAccount: function(email, password) {

			var deferred = Q.defer();

			var ref = new Firebase("https://https://originalidea.firebaseio.com");
			ref.createUser({
			  email    : email,
			  password : password
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			  } else {
			  	deferred.resolve(userData);
			    console.log("Successfully created user account with uid:", userData.uid);
			  }
			});
			return deferred.promise;

		}

	};

});