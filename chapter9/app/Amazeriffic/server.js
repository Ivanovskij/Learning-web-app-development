var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	ToDo = require("./models/todo.js"),
	app = express();

app.use(express.static(__dirname + "/client"));
app.use(express.urlencoded());

// подключаемся к хранилищу данных
mongoose.connect('mongodb://localhost/amazeriffic');

http.createServer(app).listen(8080);

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