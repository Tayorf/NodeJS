const fr =require("fs");
const path =require("path");

const chirpFile = path.join(__dirname, "/chirps.json");

const chirps = [
	{
		chirp: "chirp",
		chirp: "chirp",
		chirp: "chirpity",
		chirp: "chirp",
        chirp: "chirp",
	},
];

fs.writeFile(chirpFile, JSON.stringify(chirps), (err) => {
	if (err) {
		console.log(err);
	}
});

fs.readFile(chirpFile, "utf8", (err, data) => {
	if (err) console.log(err);
	else console.log(data);
});