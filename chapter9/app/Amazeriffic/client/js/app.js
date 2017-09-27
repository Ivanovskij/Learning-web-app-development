var main = function (toDoObjects) {
	"use strict";

	var toDos = toDoObjects.map(function (toDo) {
		return toDo.description;
	});

	// ------------------------- tabs
	var tabs = [];

	tabs.push({
		"name" : "Новые",
		"content" : function() {
			var $content = $("<ul>");
			toDos.forEach(function(todo) {
				$content.append($("<li>").text(todo));
			});
			return $content;
		}
	});

	tabs.push({
		"name" : "Старые",
		"content" : function() {
			var $content = $("<ul>");
			for (var i = toDos.length - 1; i >= 0; i--) {
				$content.append($("<li>").text(toDos[i]));
			}
			return $content;
		}
	});

	tabs.push({
		"name" : "Теги",
		"content" : function() {
			var tags = [];
			var $content;

			toDoObjects.forEach(function (toDo) {
				toDo.tags.forEach(function (tag) {
					if (tags.indexOf(tag) === -1) {
						tags.push(tag);
					}
				});
			});

			var tagObjects = tags.map(function (tag) {
				var toDosWithTag = [];

				toDoObjects.forEach(function (toDo) {
					if (toDo.tags.indexOf(tag) !== -1) {
						toDosWithTag.push(toDo.description);
					}
				});

				return { "name": tag, "toDos": toDosWithTag };
			});

			tagObjects.forEach(function (tag) {
				var $tagName = $("<h3>").text(tag.name),
					$content = $("<ul>");

				tag.toDos.forEach(function (description) {
					var $li = $("<li>").text(description);
					$content.append($li);
				});

				$("main .content").append($tagName);
				$("main .content").append($content);
			});

			return $content;
		}
	});

	tabs.push({
		"name" : "Добавить",
		"content" : function() {
			var $content,
				$button;

			var $description_text = $("<h3>").text("Описание:");
			var $input_descr = $("<input>");
			$input_descr.attr("type", "text");
			$input_descr.attr("class", "input_descr");

			var $tags_text = $("<h3>").text("tags:");
			var $input_tags = $("<input>").addClass('input_tags');

			$button = $("<button>").text("+");

			$("main .content").append($description_text).append($input_descr);
			$("main .content").append($tags_text).append($input_tags);
			$("main .content").append($button);

			$button.on("click", function() {
				var descr = $input_descr.val();
				var tags = $input_tags.val().split(",");

				if (descr == "" ||
					tags == "") {
					return;
				}

				// создаем новый элемент списка задач
				var newTodo = {"description" : descr, "tags" : tags};
				toDoObjects.push(newTodo);
				
				$.post("todos", newTodo, function(response) {
					console.log(response);
				});

				// update toDos
				toDos = toDoObjects.map(function (toDo) {
					return toDo.description;
				});

				$input_descr.val("");
				$input_tags.val("");
			});

			return $content;
		}
	});

	tabs.forEach(function(tab) {
		var $aElement = $("<a>").attr("href", ""),
			$spanElement = $("<span>").text(tab.name);

		$aElement.append($spanElement);
		$(".tabs").append($aElement);

		$spanElement.on("click", function() {
			var $content;
			$(".tabs a span").removeClass("active");
			$spanElement.addClass("active");
			$("main .content").empty();
			$content = tab.content();
			$("main .content").append($content);
			return false;
		});
	});

	// фальшивый щелчек
	// Это динамически сконструирует содержимое
	$(".tabs a:first-child span").trigger("click");
};

// новые табы
var newestTab = {
	"name" : "Новые",
	"content" : function () {
		var $content;
		$content = $("<ul>");
		for (var i = toDos.length-1; i >= 0; i--) {
			$content.append($("<li>").text(toDos[i]));
		}
		return $content;
	}
}

$(document).ready(function() {
	$.getJSON("todosOld.json", function (toDoObjects) {
		main(toDoObjects);
	});
});