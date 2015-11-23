define(["q", "jquery", "bootstrap", "add-movie-promise"], function(Q, $, addMoviePromise) {
  return function(imdbID) {
    var deferred = Q.defer();

    console.log("http://www.omdbapi.com/?i=" + imdbID);

    $.ajax({ url: "http://www.omdbapi.com/?i=" + imdbID + "&type=movie",
      method: "GET",
      // data: JSON.stringify(title)
    })
      // XHR was successful
      .done(function(json_data) {
        // Now we can resolve the promise and send the data
        deferred.resolve(json_data);
        console.log("omdb json_data", json_data);
      })
      // XHR failed for some reason
      .fail(function(xhr, status, error) {
        // Since the call failed, we have to reject the promise
        deferred.reject(error);
        // $("#add-failure").modal('show');
      });

    return deferred.promise;
  }; //--end return  
}); //--end define