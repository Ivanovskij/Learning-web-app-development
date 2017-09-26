var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	app = express(),
	servies,
	mongoUrl = "mongodb://localhost/amazeriffic";

app.use(express.static(__dirname + "/client"));
app.use(express.bodyParser());

if (process.env.VCAP_SERVICES) {
	services = JSON.parse(process.env.VCAP_SERVICES);
	mongoUrl = services["mongolab-n/a"][0].credentials.uri;
	console.log(process.env.VCAP_SERVICES);
}

console.log(mongoUrl);

// подключаемся к хранилищу данных
mongoose.connect(mongoUrl);

// определяем модель
var toDoSchema = mongoose.Schema({
	description : String,
	tags: [ String ]
});

var ToDo = mongoose.model("ToDo", toDoSchema);

http.createServer(app).listen(process.env.PORT || 3000);

app.get("/todos.json", function(req, res) {
	ToDo.find({}, function(err, toDos) {
		res.json(toDos);
	});
});

app.post("/todos", function(req, res) {
	console.log(req.body);

	var newToDo = new ToDo( { "description" : req.body.description, 
				"tags" : req.body.tags } );

	newToDo.save(function (err, response) {
		if (err != null) {
			console.log(err);
			res.send("Error: " + err);
			return;
		}

		// клиент ожидает, что будут возвращены все задачи,
		// поэтому для сохранения совместимости сделаем дополнительный запрос
		ToDo.find({}, function(err, result) {
			if (err != null) {
				// элемент не был сохранен
				res.send("Error");
			}
			res.json(result);
		});
	});
});