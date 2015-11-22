define(["q", "jquery", "add-movie-promise", "omdb-title-ajax"], function(Q, $, addMoviePromise, omdbTitleAjax) {
	return function (uid) {

//click on .add button to grab the imdb attribute that contains the imdbID number we've added/created with handlebars
		$("body").on("click", ".add", function () {
			var imdb = $(this).attr("imdb");
			console.log("imdb", imdb);
// javascripts/omdb-title-ajax.js
// passes in that imdbID number where it gets concatenated in a promise to GET the object for that movie from omdb
			omdbTitleAjax(imdb).then(function (results) {
				console.log("uid", uid, "results", results);
// javascripts/add-movie-promise.js
// passes in uid we get from login and results which is the returned promise object from omdbTitleAjax
// posts to our firebase
				addMoviePromise(uid, results);
			});
		});
	};	
});