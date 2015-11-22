define(["q", "jquery", "bootstrap", "lodash"], function(Q, $, _) {
  return function(title) {
    var deferred = Q.defer();

    console.log("http://www.omdbapi.com/?s=" + title);

// passes in title from Find Movies input to search for multiple titles
    $.ajax({ url: "http://www.omdbapi.com/?s=" + title + "&type=movie",
      method: "GET",
      // data: JSON.stringify(title)
    })
      // XHR was successful
      .done(function(json_data) {
        // Now we can resolve the promise and send the data
        deferred.resolve(json_data);
        // deferred.resolve({Search: test});
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