var ntwitter = require("ntwitter"),
	redis = require("redis"),
	credentials = require("./credentials.json"),
	redisClient,
	twitter,
	counts = {};

// set up our twitter objects
twitter = ntwitter(credentials);

// initialize our counters
counts.awesome = 0;

// создание клиента для подключения к Redis
redisClient = redis.createClient();

// обратный вызов получает два аргумента
redisClient.get("awesome", function(err, awesomeCount) {
	if (err !== null) {
		console.log("ERROR: " + err);
		return;
	}

	// установление счетчиков в целое
	// значение, хранящееся в Redis, или к нулю,
	// если оно не установлено
	counts.awesome = parseInt(awesomeCount, 10) || 0;

	twitter.stream(
		"statuses/filter",
		{ track: ["awesome"] },
		function(stream) {
			stream.on("data", function(tweet) {
				if (tweet.text.indexOf("awesome") >= -1) {
					// приращение ключевого значения клиента
					redisClient.incr("awesome");
					counts.awesome = counts.awesome + 1;
				}
			});
		}
	);
	
});

// counter
setInterval(function() {
	console.log("awesome: " + counts.awesome);
}, 3000);

module.exports = counts;