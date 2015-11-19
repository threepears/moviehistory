define(["q", "jquery"], function(Q, $) {
  
  return function(newUser) {
    var deferred = Q.defer();

    $.ajax({ url: "https://originalidea.firebaseio.com/userprofiles.json",
        method: "POST",
        data: JSON.stringify(newUser) })
      // XHR was successful
      .done(function(newUser) {
        // Now we can resolve the promise and send the data
        console.log("got data", newUser);
        deferred.resolve(newUser);
      })
      // XHR failed for some reason
      .fail(function(xhr, status, error) {
        // Since the call failed, we have to reject the promise
        deferred.reject(error);
        console.log("error", error);
      });

    return deferred.promise;
  }; //--end return  
}); //--end define