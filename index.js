import { writeFile } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

const p1 = fetch('https://opentdb.com/api.php?type=multiple&amount=1&category=9')
	.then((res) => res.json())
	.then((data) => {
		return data;
	});
const p2 = fetch('https://opentdb.com/api.php?type=multiple&amount=1&category=18')
	.then((res) => res.json())
	.then((data) => {
		return data;
	});
const p3 = fetch('https://opentdb.com/api.php?type=multiple&amount=1&category=30')
	.then((res) => res.json())
	.then((data) => {
		return data;
	});

const results = Promise.allSettled([p1, p2, p3]).then((data) => {
	console.log(data[0].value, data[1].value, data[2].value);
	const questions = [];
	if (data[0].status === 'fulfilled' && data[1].status === 'fulfilled' && data[2].status === 'fulfilled') {
		questions.push(data[0].value.results[0], data[1].value.results[0], data[2].value.results[0]);
	} else {
        throw new Error("An error occured")
    }
	writeFile(path.join(__dirname, 'data', 'questions.json'), JSON.stringify(questions, null, 2), (err) => {
		if (err) console.log(err);
		console.log('The file has been saved!');
	});
    return questions;
});

console.log(await results);
