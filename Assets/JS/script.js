var startGame = document.getElementById("startGamebtn");

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2d1ed2a192msh98939cb7c479eaap1118bajsn8c8e3a534674',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

// popular
var getPopularMusic = function() {
fetch('https://spotify23.p.rapidapi.com/search/?q=popular&type=tracks&offset=0&limit=10&numberOfTopResults=5', options)
    .then(response => response.json())
    .then(response => {
		console.log(response.tracks.items)
		var randomTrack = random_item(response.tracks.items);
		var trackId = randomTrack.data.id;
		console.log(trackId);
		console.log(randomTrack);
		getMusicById(trackId);
	})
    .catch(err => console.error(err));
}

var getMusicById = function(id) {
	fetch(`https://spotify23.p.rapidapi.com/tracks/?ids=${id}`, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

}

// lyrics
// fetch("http://tracking.musixmatch.com/t1.0/9eda005f974163fe27ab679c3e2d7074", options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];  
}

// allows for multiple actions to happen on one click
startGame.addEventListener("click", ()=>{
	console.log("this button works")
	getPopularMusic();
})

fetch('https://spotify23.p.rapidapi.com/playlist_tracks/?id=6UeSakyzhiEt4NB3UAd6NQ&offset=0&limit=10', options)
	.then(response => response.json())
	.then(response => console.log(response.items[0].track.album.images[0].url))
	.catch(err => console.error(err));
