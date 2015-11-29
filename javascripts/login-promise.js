define(["q", "jquery", "firebase"], function(Q, $, firebase) {

// logs in user
  return function(email, password) {
    
    var deferred = Q.defer();

    var ref = new Firebase("https://originalidea.firebaseio.com");

    ref.authWithPassword({
        email    : email,
        password : password
      }, function(error, authData) {
        if (error) {
          alert("Incorrect Email or Passowrd, Please try again")
          
          console.log("Login Failed!", error);
        }
         else { deferred.resolve(authData);
                  console.log("authData", authData.uid);
         }
    });

    return deferred.promise;
  }; //--end return  
}); //--end define