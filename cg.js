var clock = 0, points = 0;

$(function(){
	//on document init
	moveLetters();
	$(".letter").click(letterClick);
	$('#audio').click(toggleAudio);
});

function moveLetters() {
	clock += 1;
	$(".letter").each(function(){
		$(this).css("top", "+=2");
		if ($(this).css("top").replace("px","")>500) {
			$(this).remove();
		}
	});
	if(clock % 100 === 0) {
		var offset = Math.floor(Math.random() * 5) + 1;
		$("#canvas").append('<img src="letter.png" class="letter" style="left: ' + offset + '50px">');
		$(".letter").click(letterClick);
	}
	//if (clock % 500 === 0) { return;}
	setTimeout(moveLetters, 20);
}

function letterClick(){
	$(this).remove();
	console.log("click");
	getPoints();
}

function getPoints(howmuch) {
	howmuch = typeof howmuch !== 'undefined' ? howmuch : 1;
	points += howmuch;
	$("#points").text(String("00000" + points).slice(-6));
}

function toggleAudio() {
	  if ($("audio")[0].paused === false) {
		  $("audio")[0].pause();
	  } else {
		  $("audio")[0].play();
	  }
}