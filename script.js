/*
 * James Williams			20150606
 * PhoenixPage script.js	v1.0	
 *
 * This is the main .js file for your homepage.
 * For loading, simply make sure that this file goes to the same 
 * directory as your homepage.html and main.css files. Enjoy
 *
 * Some code credit to www.4chan.org/wg/ and www.4chan.org/g/ anons. <3
 */

//variable for search engines, to add more simply follow the format below
var search = [
//	["moniker"	"link for search results"],		Be sure to replicate syntax, ! is required in the moniker
	["",		"https://www.google.com/#q="],																//Google search DEFAULT
	["!b",		"http://www.bing.com/search?q="],															//Bing search
	["!d",		"https://duckduckgo.com/?q="],																//Duck Duck Go search
	["!w",		"https://en.wikipedia.org/w/index.php?search="],											//Wikipedia search
	["!i",		"https://www.google.com/search?hl=en&site=imghp&tbm=isch&source=hp&biw=1536&bih=766&q="],	//Google images search
	["!y",		"https://www.youtube.com/results?search_query="],											//Youtube search
	["!fj",		"http://www.funnyjunk.com/search/?q="],														//FunnyJunk search
];

var ss = search[0][1];	//Search String

function focusOnInput() {	//Function automatically focuses the browser on the search bar any time this page is opened
	document.getElementById("q").focus();
}

function handleSearch(e,q) { //Function handles the lookup of engines and querying for searches using the bar.
	var key = e.which
	
	if(key == 13){
		if(q.lastIndexOf("!") != -1) {
			var x = q.lastIndexOf("!");
			found = false;
			
			for(var i = 0; i<search.length; i++){
				if(search[i][0] == q.substr(x)) {
					found = true;
					window.location=search[i][1]+q.substr(0,x).replace(/&/g,"%26");
				}
			}
			if(!found) {
				window.location=ss+q.substr(0,x).replace(/&/g,"%26");
			}
		}else {
			window.location=ss+q.replace(/&/g,"%26");
		}
	}
}

var lastId;	//Variable stores the id of the last clicked object on the page when called
var iterance = 0; //Variable allows quick handling of bookmark menu situations.

function menuExpand(event) {	//Function handles the expanding and contracting of the bookmark menu's. To edit bookmarks refer to the .html document.
	var id = event.target.id + "_links";
	
	reset();
	
	if(iterance == 0) {
		closedMenu(id);
	}else if(iterance == 1) {
		openMenu(id);
	}else if(iterance == 2) {
		tossupMenu(id);
	}
}

function closedMenu(id) {	//Function handles all instances where a bookmark menu is closed.
	document.getElementById(id).style.display = "inline-block";
	document.getElementById("links").style.display = "table";
	lastId = id;
	iterance = 1;
}

function openMenu(id) {	//Function handles all instances where a bookmark menu is open.
	if(lastId == id) {
		document.getElementById(id).style.display = "none";
		document.getElementById("links").style.display = "none";
		iterance = 0;
	}else if(lastId != id){
		document.getElementById(id).style.display = "inline-block";
		document.getElementById("links").style.display = "table";
		iterance = 2;
	}
	lastId = id;
}

function tossupMenu(id) { //Function handles instances of the bookmark menu that don't fit
	if(lastId == id) {
		document.getElementById(id).style.display = "none";
		document.getElementById("links").style.display = "none";
		lastId = id;
		iterance = 0;
	}else if(lastId != id) {
		document.getElementById(id).style.display = "inline-block";
		document.getElementById("links").style.display = "table";
		lastId = id;
		iterance = 2;
	}
}

function reset() {	//Function simply resets the bookmark windows
	document.getElementById("school_links").style.display = "none";
	document.getElementById("browsing_links").style.display = "none";
	document.getElementById("productivity_links").style.display = "none";
	document.getElementById("other_links").style.display = "none";
}