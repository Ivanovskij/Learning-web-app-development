var ntwitter = require("ntwitter"),
	credentials = require("./credentials.json"),
	twitter,
	counts = {};

// set up our twitter objects
twitter = ntwitter(credentials);

// initialize our counters
counts.awesome = 0;

// настроим поток twitter с тремя параметрами
// разделенными запятыми
twitter.stream(
	'statuses/filter',
	{ track: ["awesome"] },
	function(stream) {
		stream.on('data', function(tweet) {
			if (tweet.text.indexOf("awesome") > -1) {
				// increment the awesome counter
				counts.awesome = counts.awesome + 1;
			}
		});
	}
);

// counter
setInterval(function() {
	console.log("awesome: " + counts.awesome);
}, 3000);

module.exports = counts;