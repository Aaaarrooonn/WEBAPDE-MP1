function removePopup() {
	$("#popupbackground").remove();
}

function showPopup() {
	$("body").append('<div id="popupbackground"><img class="navbuttons" id="exitbtn" src="resources/exit.png" onclick="removePopup()" onkeyup="handlePopup(event)"></div>');
}

function searchPopup() {
	showPopup();
	$("#popupbackground").append('<input type="text" name="search" placeholder="Search" class="inputbar" id="searchbar" onkeyup="handleSearch(event)">');

	var x = $("#searchbar");
	x.focus();
	x.select();
}

function uploadPopup() {
	showPopup();
	$("#popupbackground").append('<div id="uploadform"><input type="file" name="file"><select name="audience"><option name="public">Public</option><option name="private">Private</option></select></div>');
}

function handleSearch(e) {
	if(e.keyCode == 13) {
		e.preventDefault();
		alert("Search results for " + $("#searchbar").val());
		removePopup();
	} else if(e.keyCode == 27) {
		removePopup();
	}
}

function handleTag(e) {
	if(e.keyCode == 13) {
		e.preventDefault();
		alert("Tag added is "+$("#tagbar").val());
		removePopup();
	} else if(e.keyCode == 27) {
		removePopup();
	}
}

function handlePopup(e) {
	if(e.keyCode == 27) {
		removePopup();
	}
}

function createThumbnail(a, b) {
	var x = Math.floor(Math.random() * (1000 - 170 + 1)) + 170;
	var y = Math.floor(Math.random() * (1000 - 170 + 1)) + 170;

	$("#feed").append('<div class="outertile"><img src="http://via.placeholder.com/'+x+'x'+y+'" class="imagetile"><div class="overlaytile"><span id="tilelabels"><span id="tiletitle">'+a+'</span><br><span id="tileauthor"><a href="#">@'+b+'</a></span></span><img onclick="addTag()" id="addbtn" class="navbuttons" src="resources/add.png"></div></div>');
}

function addTag() {
	showPopup();
	$("#popupbackground").append('<input type="text" name="tag" placeholder="Add tag" class="inputbar" id="tagbar" onkeyup="handleTag(event)">');

	var x = $("#tagbar");
	x.focus();
	x.select();
}

window.onload = function() {
	for(var i = 1; i < 21; i++) {
		createThumbnail(i, "Aaron");
	}
}