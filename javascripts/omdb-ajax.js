define(["q", "jquery", "bootstrap", "lodash"], function(Q, $, _) {
  return function(title) {
    var deferred = Q.defer();

    console.log("http://www.omdbapi.com/?s=" + title + "&type=movie");

// passes in title from Find Movies input to search for multiple titles
    $.ajax({ url: "http://www.omdbapi.com/?s=" + title + "&type=movie",
      method: "GET",
      // data: JSON.stringify(title)
    })
      // XHR was successful
      .done(function(json_data) {
        console.log("omdb json_data", json_data);
        console.log(json_data.Search.length);
/*        var newList = [];

        for (var i = 0; i < json_data.Search.length; i++) {
          if (json_data.Search[i].Poster !== "N/A") {
            newList.push(json_data.Search[i]);
          }
        }

        console.log(newList);*/
        
        // Now we can resolve the promise and send the data
/*        deferred.resolve(json_data);
*/      deferred.resolve(json_data);
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