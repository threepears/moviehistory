define(["q", "jquery"], function(Q, $) {
  
  return function (email, password) {

    var ref = new Firebase("https://originalidea.firebaseio.com");
    ref.createUser({
      email: email,
      password: password
    }, function(error, userData) {
      if (error) {
        switch (error.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", error);
        }
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
  };
  // return function(email, password) {
  //   var deferred = Q.defer();

  //   var ref = new Firebase("https://originalidea.firebaseio.com");

  //     ref.createUser({
  //       email    : email,
  //       password : password
  //     }, function () {
  //       console.log("hey it worked");
  //     }).done(function(newUser) {
  //       console.log("new user data", newUser);
  //       deferred.resolve(newUser);
  //     }).fail(function(xhr, status, error) {
  //       deferred.reject(error);
  //       console.log("error", error);
  //     });

  //   return deferred.promise;
    // $.ajax({ url: "https://originalidea.firebaseio.com/userprofiles.json",
    //     method: "POST",
    //     data: JSON.stringify(newUser) })
    //   // XHR was successful
    //   .done(function(newUser) {
    //     // Now we can resolve the promise and send the data
    //     console.log("got data", newUser);
    //     deferred.resolve(newUser);
    //   })
    //   // XHR failed for some reason
    //   .fail(function(xhr, status, error) {
    //     // Since the call failed, we have to reject the promise
    //     deferred.reject(error);
    //     console.log("error", error);
    //   });

    // return deferred.promise;
//   }; //--end return  
}); //--end define


//  };
// });




