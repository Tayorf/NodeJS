const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");

const filmsFile = path.join(__dirname, "./favfilms.json");

const filmArray = [];

fetch("https://api-ghibli.herokuapp.com/films")
	.then((res) => res.json())
	.then((data) => {
		data.forEach((film) => {
			let movie = {
				id: film.id,
				title: film.title,
				description: film.description,
				rt_score: film.rt_score,
			};
			filmArray.push(movie);
			movie = {};
		});
		console.log(filmArray);
		fs.writeFile(filmsFile, JSON.stringify(filmArray), (err) => {
			if (err) console.log(err);
		});
	});