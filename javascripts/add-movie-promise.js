define(["q", "jquery"], function(Q, $) {
  return function(uid, imdbObject) {
    var deferred = Q.defer();

// adds keys/values onto object from omdb before putting the object under the uid of the user in firebase
    imdbObject.watched = "false";
    imdbObject.rating = 0;

// adds in imdbObject to userprofiles/uid/movies creates a random key
    $.ajax({ url: "https://originalidea.firebaseio.com/userprofiles/" + uid + "/movies/.json",
        method: "POST",
        data: JSON.stringify(imdbObject) })
      // XHR was successful
      .done(function(json_data) {
        // Now we can resolve the promise and send the data
        console.log("got data", json_data);
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