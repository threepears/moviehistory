requirejs.config({
  baseUrl: "./javascripts",
  paths:{
    "jquery": "../lib/bower_components/jquery/dist/jquery.min",
    "bootstrap": "../lib/bower_components/bootstrap/dist/js/bootstrap.min",
    "hbs": "../lib/bower_components/require-handlebars-plugin/hbs",
    "handlebars": "../lib/bower_components/handlebars/handlebars.min",
    "lodash": "../lib/bower_components/lodash/lodash.min",
    "firebase": "../lib/bower_components/firebase/firebase",
    "q": "../lib/bower_components/q/q",
    "bootstrap-slider": "../lib/bower_components/seiyria-bootstrap-slider/js/bootstrap-slider"
  },
  shim: {
  	"bootstrap": {
  		deps: ["jquery"],
    "firebase": {
      exports: "Firebase"
}
  	}
  }
});

require(
	["bootstrap", "main"],
	function(bootstrap, main) {
		
	}
);