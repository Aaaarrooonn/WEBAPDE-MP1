var root = 'https://jsonplaceholder.typicode.com';
var users = [];
var posts = [];
var photos = [];
var albums = [];
var lastpostindex = 11;
var lastphotoindex = 0;
var lastphotoloaded = 0;
var numposts = 0;
var checkposts = 0;
var checkusers = 0;
var checkphotos = 0;
var checkalbums = 0;

//Objects for a user
function User(id, name, username, email, address, phone, website, company) {
	this.id = id;
	this.name = name;
	this.username = username;
	this.email = email;
	this.address = address;
	this.phone = phone;
	this.website = website;
	this.company = company;

	this.toString = function() {
		return "id: " + this.id + "\nname: " + this.name + "\nusername: " + this.username + "\nemail: " + this.email + "\naddress: " + this.address.toString() + "\nphone: " + this.phone + "\nwebsite: " + this.website + "\ncompany: " + this.company.toString();
	};
}

function Geo(lat, lng) {
	this.lat = lat;
	this.lng = lng;

	this.toString = function() {
		return "\nlat: " + this.lat + "\nlng: " + this.lng; 
	};
}

function Address(street, suite, city, zipcode, geo) {
	this.street = street;
	this.suite = suite;
	this.city = city;
	this.zipcode = zipcode;
	this.geo = geo;

	this.toString = function() {
		return "\nstreet: " + this.street + "\nsuite: " + this.suite + "\ncity: " + this.city + "\nzipcode: " + this.zipcode + "\nGeo: " + this.geo.toString();
	};
}

function Company(name, catchPhrase, bs) {
	this.name = name;
	this.catchPhrase = catchPhrase;
	this.bs = bs;

	this.toString = function() {
		return "\nname: " + this.name + "\ncatchPhrase: " + this.catchPhrase + "\nbs: " + this.bs;
	};
}

//Object for posts
function Post(userId, id, title, body) {
	this.userId = userId;
	this.id = id;
	this.title = title;
	this.body = body;

	this.toString = function() {
		return "userId: " + this.userId + "\nid: " + this.id + "\ntitle: " + this.title + "\nbody: " + this.body;
	};
}

//Object for albums
function Album(userId, id, title) {
	this.userId = userId;
	this.id = id;
	this.title = title;
}

//Object for photos
function Photo(albumId, id, title, url, thumbnailUrl) {
	this.albumId = albumId;
	this.id = id;
	this.title = title;
	this.url = url;
	this.thumbnailUrl = thumbnailUrl;
}

function loadAlbums() {
	albums = [];

	for(i = 1; i <= 100; i++) {
		console.log("loading album " + i)
		$.ajax({
		  	url: root + '/albums/' + i,
		  	method: 'GET'
		}).then(function(data) {
		  	//console.log(data);
		  	albums.push(new Album(data.userId, data.id, data.title));
		  	checkalbums++;
		});
	}
}

function loadPhotos(y) {	
	temp = checkphotos;
	temp++;
	lastphotoloaded = lastphotoloaded + y;

	for(i = temp; i <= lastphotoloaded; i++) {
		console.log("loading photo " + i)
		$.ajax({
		  	url: root + '/photos/' + i,
		  	method: 'GET'
		}).then(function(data) {
		  	//console.log(data);
		  	photos.push(new Photo(data.albumId, data.id, data.title, data.url, data.thumbnailUrl));
		  	checkphotos++;
		});
	}
}

function loadPosts() {
	posts = [];

	for(i = 1; i <= 100; i++) {
		console.log("loading post " + i)
		$.ajax({
		  	url: root + '/posts/' + i,
		  	method: 'GET'
		}).then(function(data) {
		  	//console.log(data);
		  	posts.push(new Post(data.userId, data.id, data.title, data.body));	
		  	checkposts++;
		});
	}
}

function printPosts() {
	for(i = 0; i < posts.length; i++)
		console.log(posts[i].toString());

	console.log("Number of posts: " + posts.length);
}

function loadUsers() {
	users = [];

	for(i = 1; i <= 10; i++) {
		console.log("loading user " + i)
		$.ajax({
		  	url: root + '/users/' + i,
		  	method: 'GET'
		}).then(function(data) {
		  	//console.log(data);
		  	users.push(new User(data.id, data.name, data.username, data.email, new Address(data.address.street, data.address.suite, data.address.city, data.address.zipcode, new Geo(data.address.geo.lat, data.address.geo.lng)), data.phone, data.website, new Company(data.company.name, data.company.catchPhrase, data.company.bs)));	
		  	checkusers++;
		});
	}
}

function printUsers() {
	for(i = 0; i < users.length; i++)
		console.log(users[i].toString());

	console.log("Number of users: " + users.length);
}

function getUser(id) {
	for(i = 0; i < users.length; i++)
		if(users[i].id == id)
			return users[i];
}

function getAlbum(id) {
	for(i = 0; i < albums.length; i++)
		if(albums[i].id == id)
			return albums[i];
}

function getPost(id) {
	for(i = 0; i < posts.length; i++)
		if(posts[i].id == id)
			return posts[i];
}

function searchBar() {
	document.getElementsByTagName('HEADER')[0].innerHTML = "<header><input type='text' id='searchbar' onkeypress='handle(event)'></header>";
}

function handle(e){
    if(e.keyCode === 13){
        e.preventDefault();
        alert("No result found for " +document.getElementById('searchbar').value);
        document.getElementsByTagName('BODY')[0].innerHTML = '<header><button onclick="displayPosts()" id="navbutton">Posts</button><button onclick="searchBar()" id="navbutton">Search</button><button onclick="displayPhotos()" id="navbutton">Photos</button></header>';
    }
}

// id, name, username, email, address, phone, website, company
function showProfile(id) {
	var temp = getUser(id);
	var add = temp.address;
	var comp = temp.company;

	document.getElementsByTagName('BODY')[0].innerHTML = '<header><button onclick="displayPosts()" id="navbutton">Posts</button><button onclick="searchBar()" id="navbutton">Search</button><button onclick="displayPhotos()" id="navbutton">Photos</button></header>';
	$("<div></div>").addClass("profile").appendTo("body");
	$("<div></div>").addClass("userinfo").appendTo(".profile");
	$(".userinfo").append("<p class='profileinfolabel'>Username:</p>");
	$(".userinfo").append("<p class='profileinfo' id='profileusername'>"+temp.username+"</p>");
	$(".userinfo").append("<p class='profileinfolabel'>Name:</p>");
	$(".userinfo").append("<p class='profileinfo' id='profilename'>"+temp.name+"</p>");	
	$(".userinfo").append("<p class='profileinfolabel'>Email:</p>");
	$(".userinfo").append("<p class='profileinfo' id='profileemail'>"+temp.email+"</p>");
	$(".userinfo").append("<p class='profileinfolabel'>Address:</p>");
	$(".userinfo").append("<p class='profileinfo' id='profileaddress'>"+add.street+", "+add.suite+", "+add.city+" "+add.zipcode+"</p>");
	$(".userinfo").append("<p class='profileinfolabel'>Phone:</p>");
	$(".userinfo").append("<p class='profileinfo' id='profilephone'>"+temp.phone+"</p>");
	$(".userinfo").append("<p class='profileinfolabel'>Website:</p>");
	$(".userinfo").append("<a href='#' class='profileinfo' id='profilewebsite'>"+temp.website+"</a>");
	$(".userinfo").append("<p class='profileinfolabel'>Company:</p>");
	$(".userinfo").append("<p class='profileinfo' id='profilecompname'>"+comp.name+"</p>");
	$(".userinfo").append("<p class='profileinfo' id='profilecatchphrase'>"+comp.catchPhrase+"</p>");
	$(".userinfo").append("<p class='profileinfo' id='profilebs'>"+comp.bs+"</p>");

	$("<div></div>").addClass("profilefeed").appendTo(".profile");
	var tempposts = [];
	for(x = 0; x < posts.length; x++) {
		if(posts[x].userId == id)
			tempposts.push(posts[x]);
	}
	console.log("done transferriong tempposts.length" + tempposts.length);
	for(y = 0; y < tempposts.length; y++) {
		console.log("tempposts[y].id"+tempposts[y].id);
		$("<div></div>").addClass("post").attr('id', tempposts[y].id).appendTo(".profilefeed");
		$("#"+tempposts[y].id).append("<b><div id='title'>" + tempposts[y].title + "</div>"+ "");
		$("#"+tempposts[y].id).append("<div id='postcontent'>" + tempposts[y].body + "</div>");
		console.log("doney"+y);
	}

	$("<div></div>").addClass("profilealbums").appendTo(".profile");

	var tempalbums = [];
	for(x = 0; x < albums.length; x++) {
		if(albums[x].userId == id)
			tempalbums.push(albums[x]);
	}

	for(y = 0; y < tempalbums.length; y++) {
		$("<div></div>").addClass("album").attr('id', tempalbums[y].id).appendTo(".profilealbums");
		$("#"+tempalbums[y].id +".album").append("<img src='"+photos[y].thumbnailUrl+"' class='albumthumb'><div id='albumtitle'><p onclick='showAlbum("+tempalbums[y].id+")'>" + tempalbums[y].title + "</p></div><br>"+ "");
	}
}

function showAlbum(id) {
	document.getElementsByTagName('BODY')[0].innerHTML = '<header><button onclick="displayPosts()" id="navbutton">Posts</button><button onclick="searchBar()" id="navbutton">Search</button><button onclick="displayPhotos()" id="navbutton">Photos</button></header>';
	$("<div></div>").addClass("albumfeed").appendTo("body");
	$("<p id='title'>"+getAlbum(id).title+"</p>").appendTo(".albumfeed");
	$("<p id='username' onclick='showProfile("+getAlbum(id).userId+")'>@"+getUser(getAlbum(id).userId).username+"</p>").appendTo(".albumfeed");

	currphotos = [];
	var lb = ((id-1)*50)+1;
	var ub = lb + 50;

	for(i = lb; i < ub; i++) {
		console.log("loading photo " + i)
		$.ajax({
		  	url: root + '/photos/' + i,
		  	method: 'GET'
		}).then(function(data) {
		  	//console.log(data);
		  	currphotos.push(new Photo(data.albumId, data.id, data.title, data.url, data.thumbnailUrl));

			$(".albumfeed").append("<input type='image' src='" + data.thumbnailUrl + "' class='photos' id='" + (currphotos.length-1) + "' onclick='displayPhotoInAlbumInfo(this.id)'>");
		});
	}
}

function displayPhotoInAlbumInfo(id) {
	$("body").append("<div class='photopopup'><p id='removepicture' onclick='removePicture()'>X</p><input type='image' src='" + currphotos[id].url + "' class='photoactual'><div class='photoinfo'><p id='phototitle'>"+currphotos[id].title+"</p><p onclick='showAlbum("+currphotos[id].albumId+")' id='photoalbum'>"+getAlbum(currphotos[id].albumId).title+"</p><p onclick='showProfile("+getAlbum(currphotos[id].albumId).userId+")' id='photouser'>@"+getUser(getAlbum(currphotos[id].albumId).userId).username+"</p></div></div>");
	
	$("body").append("<div id='opaquelayer'></div>");

	$("html, body").animate({ scrollTop: 0 }, "slow");
}

function displayPosts() {
	document.getElementsByTagName('BODY')[0].innerHTML = '<header><button onclick="displayPosts()" id="navbutton">Posts</button><button onclick="searchBar()" id="navbutton">Search</button><button onclick="displayPhotos()" id="navbutton">Photos</button></header>';
	$("<div></div>").addClass("feed").appendTo("body");
	lastpostindex = 11;
	displayTen();
}

function displayPhotos() {
	document.getElementsByTagName('BODY')[0].innerHTML = '<header><button onclick="displayPosts()" id="navbutton">Posts</button><button onclick="searchBar()" id="navbutton">Search</button><button onclick="displayPhotos()" id="navbutton">Photos</button></header>';
	$("<div></div>").addClass("photosfeed").appendTo("body");
	lastphotoindex = 0;
	displayFifteen();
}

function displayTen() {
	if(lastpostindex > 0)
		lastpostindex--;
	else
		return;	

	$("#loadmore").remove();

	var tempindex = lastpostindex;
	var temppost; //Current post 
	
	for(i = 0; i < 10; i++) {
		for(j = 0; j < 100; j++) {
			if(posts[j].id == tempindex) {
				console.log("tempindex" + tempindex);
				temppost = posts[j];
				$("<div></div>").addClass("post").attr('id', temppost.id).appendTo(".feed");
				$("#" + temppost.id).append("<b><div id='title'>" + temppost.title + "</div>"+ "");
				$("#" + temppost.id).append("" + "<a href='#' onclick='showProfile("+temppost.userId+")' id='username'>@" + getUser(temppost.userId).username + "</a>" + "");
				
				$("#" + temppost.id).append("<div id='postcontent'>" + temppost.body + "</div>");

				tempindex = tempindex + 10;
				break;
			}
		}
	}

	console.log(lastpostindex);

	if(lastpostindex != 0)
		$("<p style='text-align:center;' onclick='displayTen()' class='loadmore'>Load more</p>").addClass("post").attr('id', 'loadmore').appendTo(".feed");
}

function displayFifteen() {

	$("#loadmore").remove();

	for(i = 0; i < 15; i++) {
		$(".photosfeed").append("<input type='image'  src='" + photos[lastphotoindex].thumbnailUrl + "' class='photos' id=" + lastphotoindex + " onclick='displayPhotoInfo(this.id)'>");
		lastphotoindex++;
		console.log("lastphotoindex" + lastphotoindex);
	}

	if(!(lastphotoindex >= 5000))
		$("<p style='text-align:center;' onclick='displayFifteen()' class='loadmore'>Load more</p>").addClass("post").attr('id', 'loadmore').appendTo(".photosfeed");

	var temp = lastphotoloaded - lastphotoindex;	
	console.log("checkphotos preloadmore " + checkphotos);
	if(temp < 15) {
		console.log("loading more");
		loadPhotos(50);
		loadMorePhotos();
	}
	console.log("temp" + temp + "\nlastphotoindex" + lastphotoindex + "\nlastphotoloaded" + lastphotoloaded + "\ncheckphotos" + checkphotos);
}

function displayPhotoInfo(id) {
	$("body").append("<div class='photopopup' id='" + id + "'><p id='removepicture' onclick='removePicture()'>X</p><input type='image' src='" + photos[id].url + "' class='photoactual'><div class='photoinfo'><p id='phototitle'>"+photos[id].title+"</p><p onclick='showAlbum("+photos[id].albumId+")' id='photoalbum'>"+getAlbum(photos[id].albumId).title+"</p><p onclick='showProfile("+getAlbum(photos[id].albumId).userId+")' id='photouser'>@"+getUser(getAlbum(photos[id].albumId).userId).username+"</p></div></div>");
	
	$("body").append("<div id='opaquelayer'></div>");

	$("html, body").animate({ scrollTop: 0 }, "slow");
}

function removePicture() {
	$("#opaquelayer").remove();
	$(".photopopup").remove();
	console.log("removepicture");
}

window.onload = function() {
	loadUsers();
	loadPosts();
	loadAlbums();
	loadPhotos(50);

	checkDoneLoad();
	document.getElementsByTagName('BODY')[0].innerHTML = '<header><button onclick="displayPosts()" id="navbutton">Posts</button><button onclick="searchBar()" id="navbutton">Search</button><button onclick="displayPhotos()" id="navbutton">Photos</button></header>';
}

function checkDoneLoad() {
    if(checkusers != 10 && checkposts != 100 && checkalbums != 100 && checkphotos != lastphotoloaded) {
       window.setTimeout(checkDoneLoad, 100);
    } else {
      displayPosts();
    }
}

function loadMorePhotos() {
    if(checkphotos != lastphotoloaded) {
       window.setTimeout(loadMorePhotos, 100);
       console.log("Not yet done loading more photos checkphotos" + checkphotos);
    } else {
    	console.log("Done loading more photos");
    }
}

function loadAlbumPhotos(x) {
    if(x != 50) {
       window.setTimeout(loadAlbumPhotos, 100);
    } else {
    	console.log("Done LOADINGINGINIGNIG");
    }
}
