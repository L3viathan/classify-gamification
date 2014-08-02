var clock = 0, points = 0, timeout = 0;
var currentObject, currentState;

$(function(){
	//on document init
	moveLetters();
	$(".letter").click(letterClick);
	$('#audio').click(toggleAudio);
	$.each(classes,function(e){
		$("#question").append("<button data-id='" + classes[e].id + "' class='button-class'>" + classes[e].description + "</button>");
	})
	$(".button-class").click(buttonClick);
	if(window.location.protocol == "file") toggleAudio();
});

function moveLetters() {
	clock += 1;
	$(".letter").each(function(){
		$(this).css("top", "+=2");
		if ($(this).css("top").replace("px","")>500) {
			$(this).remove();
			getPoints(-1);
		}
	});
	if(clock % 100 === 0) {
		var offset = Math.floor(Math.random() * 5) + 1;
		$("#canvas").append('<img src="letter.png" class="letter" style="left: ' + offset + '50px">');
		$(".letter").click(letterClick);
	}
	//if (clock % 500 === 0) { return;}
	timeout = setTimeout(moveLetters, 20);
}

function letterClick(){
	$(this).remove();
	if (Math.random() > 0.8) {
		var item = gold[Math.floor(Math.random()*gold.length)];
		$("#sentence").text(item.description);
		currentState = "gold";
		currentObject = item;
	}
	else {
		var item = unknown[Math.floor(Math.random()*unknown.length)];
		$("#sentence").text(item.description);
		currentState = "unknown";
		currentObject = item;
	}
	$("#question").addClass("active");
}

function getPoints(howmuch) {
	howmuch = typeof howmuch !== 'undefined' ? howmuch : 1;
	points += howmuch;
	points = points >= 0 ? points : 0;
	$("#points").text(String("00000" + points).slice(-6));
}

function toggleAudio() {
	  if ($("audio")[0].paused === false) {
		  $("audio")[0].pause();
	  } else {
		  $("audio")[0].play();
	  }
}

function buttonClick(button) {
	if(currentState == "gold") {
		if(currentObject.goldclass == $(this).data("id")) {
			getPoints(10);
		}
		else {
			getPoints(-10);
		}
	}
	else {
		//send request to server with $(this).data("id") and currentObject.id
		getPoints(1);
	}
	$("#question").removeClass("active");
}