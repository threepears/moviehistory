define(["q", "jquery"], function(Q, $) {
  
  return function(currentMovie, Stars, uid) {
    var deferred = Q.defer();

    console.log(currentMovie);
    console.log(Stars);
    console.log(uid);
    Stars = parseInt(Stars);

    var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles/" + uid + "/movies/" + currentMovie);
      ref.update({ watched: true, rating: Stars 
      }, function(error, userData) {
        if (error) {
          console.log("Error posting data:", error);
        } else {
          deferred.resolve(userData);
          console.log("Successfully posted data");
        }
      });

    return deferred.promise;
  }; //--end return  
}); //--end define