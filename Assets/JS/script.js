const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2d1ed2a192msh98939cb7c479eaap1118bajsn8c8e3a534674',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

fetch('https://spotify23.p.rapidapi.com/playlist/?id=6UeSakyzhiEt4NB3UAd6NQ', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

fetch('https://spotify23.p.rapidapi.com/track_lyrics/?id=1brwdYwjltrJo7WHpIvbYt', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

    console.log("This works")

fetch("http://tracking.musixmatch.com/t1.0/	9eda005f974163fe27ab679c3e2d7074", options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));