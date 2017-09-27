var mongoose = require("mongoose");

// определяем модель
var toDoSchema = mongoose.Schema({
	description : String,
	tags: [ String ]
});

var ToDo = mongoose.model("ToDo", toDoSchema);

module.exports = ToDo;