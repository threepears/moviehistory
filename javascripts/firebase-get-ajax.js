define(["q", "jquery"], function(Q, $) {
  return function(uid) {

    var deferred = Q.defer();

    console.log("uid", uid);
    $.ajax({ url: "https://originalidea.firebaseio.com/.json/userprofiles/" + uid +"/movies"})
      // XHR was successful
      .done(function(json_data) {
        // Now we can resolve the promise and send the data
        console.log("movies from uid json_data", json_data);
        deferred.resolve(json_data);
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