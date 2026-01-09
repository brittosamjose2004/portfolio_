import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('britto_sam_jose_resume.pdf');

pdf(dataBuffer).then(function (data) {
    console.log(data.text);
}).catch(err => {
    console.error("Error extraction PDF", err);
});
