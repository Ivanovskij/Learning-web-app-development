var express = require("express"),
	http = require("http"),
	app = express(),
	toDos = [
		{ 
			"description" : "Get groceries",
			"tags"  : [ "5", "1" ]
		},
	];

app.use(express.static(__dirname + "/client"));
http.createServer(app).listen(8080);

// коммандуем Express принять поступающие
// объекты JSON
app.use(express.urlencoded());

app.get("/todos", function (req, res) {
	res.json(toDos);
});

app.post("/todos", function (req, res) {
	var newTodo = req.body;

	console.log(newTodo);

	toDos.push(newTodo);

	res.json({ "message" : "data" });
});;