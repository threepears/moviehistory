define(["q", "jquery"], function(Q, $) {
 
// register new user. does not log them in  
  return function(email, password) {
    var deferred = Q.defer();

    var ref = new Firebase("https://originalidea.firebaseio.com");
      ref.createUser({
        email: email,
        password: password
      // XHR was successful
      }, function(error, userData) {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            $(".errorId").html("The new user account cannot be created because the email is already in use.");
            deferred.reject(error);
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            $(".errorId").html("The specified email is not a valid email.");
            deferred.reject(error);
            break;
          default:
            console.log("Error creating user:", error);
            $(".errorId").html("Error creating user");
            deferred.reject(error);
        }
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        ref = new Firebase("https://originalidea.firebaseio.com/userprofiles/" + userData.uid);
        ref.set({
          email: email
        });
        deferred.resolve(userData);
      }
    });

    return deferred.promise;
  }; //--end return  
}); //--end define



