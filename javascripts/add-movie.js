define(["q", "jquery", "add-movie-promise"], function(Q, $, addMoviePromise) {
	return function (uid) {
		$("body").on("click", ".add", function () {
			var imdb = $(this).attr("imdb");
			console.log("imdb", imdb);
			addMoviePromise(uid, imdb);
		});
	};	
});