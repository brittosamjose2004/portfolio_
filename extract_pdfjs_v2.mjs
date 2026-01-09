import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs';
import fs from 'fs';

const data = new Uint8Array(fs.readFileSync('britto_sam_jose_resume.pdf'));
const loadingTask = getDocument(data);

loadingTask.promise.then(async function (pdf) {
    let fullText = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        fullText += textContent.items.map(item => item.str).join(' ');
    }
    console.log(fullText);
    const outputContent = `export const resumeText = ${JSON.stringify(fullText)};`;
    fs.writeFileSync('src/data/resumeData.js', outputContent);
    console.log("Saved to src/data/resumeData.js");
}).catch(err => {
    console.error(err);
});
