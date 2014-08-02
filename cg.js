var clock = 0, points = 0, timeout = 0;
var currentObject, currentState, annotator;

$(function(){
	//on document init
	moveLetters();
	$(".letter").click(letterClick);
	$('#audio').click(toggleAudio);
	$.each(classes,function(e){
		$("#question").append("<button data-id='" + classes[e].id + "' class='button-class'>" + classes[e].description + "</button>");
	})
	$(".button-class").click(buttonClick);
	annotator = readCookie("annotator");
	if (annotator == null) {
		//create valid v4-uuid
		annotator = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
		createCookie("annotator", annotator, 365);
	}
	if (readCookie("noaudio") == "1"){
		console.log("noaudio");
	}
	else {
		console.log("audio"+ readCookie("noaudio"));
		$("audio")[0].play();
	}
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
	if($("#question").hasClass("active")) getPoints(-1); //penalize skipping
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
		  createCookie("noaudio", "1", 365);
	  } else {
		  $("audio")[0].play();
		  eraseCookie("noaudio");
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

function createCookie(name,value,days) {
	var expires;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}
	else expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}