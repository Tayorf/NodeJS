const path = require("path");
const fs = require("fs");
const https = require("https");
const axios = require("axios");

const file = fs.createWriteStream("file.jpg");

async function downloadBanner(url, title) {
	const downloadFolder = path.join(__dirname, "/downloads", `${title}.jpg`);
	const writer = fs.createWriteStream(downloadFolder);

	try {
		const response = await axios({
			url: url,
			method: "GET",
			responseType: "stream",
			timeout: 100000,
			httpsAgent: new https.Agent({ keepAlive: true }),
		});

		response.data.pipe(writer);
		await new Promise((resolve, reject) => {
			writer.on("finish", resolve);
			writer.on("error", reject);
		});
		console.log(`${title} banner downloaded successfully.`);
	} catch (error) {
		console.error(`Error downloading ${title} banner:`, error);
	}
}

axios
	.get("https://api-ghibli.herokuapp.com/films")
	.then(async (response) => {
		const data = response.data;
		for (const film of data) {
			await downloadBanner(film.movie_banner, film.title);
		}
		console.log("All banners downloaded successfully.");
	})
	.catch((err) => console.error(err));