define(["q", "jquery", "filter"], function(Q, $, filter) {

	return function (value, uid, starFilteredMovies) {

		var ref = new Firebase("https://originalidea.firebaseio.com/userprofiles/" + uid + "/movies");
		ref.on("value", function(snapshot) {
			var userMovie = snapshot.val();
			console.log(userMovie);
			 
		  	for (var key in userMovie) {
		  		console.log(userMovie[key].rating);
		  		console.log(key);
		  		console.log(userMovie[key]);
		  		if (value === 0) {
		  			filter(uid);
		  			break;
		  		}
		  		else if (userMovie[key].rating === value) {
		  			starFilteredMovies.push(userMovie[key]);
		  		}
		  	}
	    }, function (errorObject) {
		  console.log("The read failed: " + errorObject.code);
		});

	  	require(['hbs!../templates/unadded-poster'], function (unaddedPoster) {
          $("#home-page .row").html(unaddedPoster({movie: starFilteredMovies}));
        });
	};
});