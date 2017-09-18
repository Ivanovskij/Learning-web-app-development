var ntwitter = requie("ntwitter"),
	credentials = requie("./credentials.json"),
	twitter;

twitter = ntwitter(credentials);
// настроим поток twitter с тремя параметрами
// разделенными запятыми
twitter.stream(
	// первый параметр строка
);