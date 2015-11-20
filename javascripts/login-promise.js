define(["q", "jquery", "firebase"], function(Q, $, firebase) {

  return function (email, password) {
    
    var deferred = Q.defer();

    var ref = new Firebase("https://originalidea.firebaseio.com");

    ref.authWithPassword({
        email    : email,
        password : password
      }, function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else { 
          console.log("authData", authData);
          deferred.resolve(authData); }
    });

    return deferred.promise;
  }; //--end return  
}); //--end define