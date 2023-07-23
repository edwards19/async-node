import { writeFile } from 'fs/promises';

const quizAPI = 'https://opentdb.com/api.php?type=multiple&amount=1&category=',
	category = [9, 19, 30],
	outfile = './data/questions.json';

// fetch question in all categories (multiple asynchronous Promises)
const quizRes = await Promise.allSettled(category.map((c) => fetch(quizAPI + c)));

// convert JSON to object (multiple asynchronous Promises)
const quizObj = await Promise.allSettled(
	quizRes.filter((q) => q && q.status === 'fulfilled' && q.value).map((q) => q.value.json())
);

// get first result and filter failures
const quizData = quizObj
	.filter((q) => q && q.status === 'fulfilled' && q.value && q.value.results && q.value.results[0])
	.map((q) => q.value.results[0]);

console.log(`fetched ${quizData.length} valid quiz questions`);

try {
	await writeFile(outfile, JSON.stringify(quizData, null, 2));
	console.log(`${outfile} saved`);
} catch (err) {
	console.log(`${outfile} not saved:\n`, err);
}





