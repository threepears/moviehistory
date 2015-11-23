define(["q", "jquery", "add-movie-promise", "omdb-title-ajax"], function(Q, $, addMoviePromise, omdbTitleAjax) {
	return function (uid) {
		$("body").on("click", ".add", function () {
			var imdb = $(this).attr("imdb");
			console.log("imdb", imdb);
			// addMoviePromise(uid, imdb);
			omdbTitleAjax(imdb).then(function (results) {
				console.log("uid", uid, "results", results);
				addMoviePromise(uid, results);
			});
		});
	};	
});