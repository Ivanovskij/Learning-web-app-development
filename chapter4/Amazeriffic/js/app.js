var main = function () {
	"use strict";

	var toDos = [
		"Закончить писать эту книгу",
		"Вывести Грейси на прогулку в парк",
		"Ответить на электронные письма",
		"Подготовиться к лекции в понедельник",
		"Обновить несколько новых задач",
		"Купить продукты"
	];

	$(".tabs a span").toArray().forEach(function (_element) {
		$(_element).on("click", function() {
			var $element = $(_element);
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();

			var $content;
			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				toDos.forEach(function(todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function(todo) {
					$content.append($("<li>").text(todo));
				});
				$("main .content").append($content);
			} else if ($element.parent().is(":nth-child(3)")) {
				
			}

			return false;
		});
		
	});

	// фальшивый щелчек
	// Это динамически сконструирует содержимое
	$(".tabs a:first-child span").trigger("click");

	// Обработка активного таба
	/*var sizeTabs = 3;
	for (var tabNumber = 1; tabNumber <= sizeTabs; tabNumber++) {
		var $tabSelector = $(".tabs a:nth-child(" + tabNumber + ") span");
		$tabSelector.on("click", function() {
			$(".tabs span").removeClass("active");
			$(this).addClass("active");
			$("main .content").empty();
			return false;
		});
	}*/

};

$(document).ready(main);