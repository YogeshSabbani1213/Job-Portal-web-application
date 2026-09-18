const text = `
React is a JavaScript library used to build user interfaces.
Node.js is a runtime environment used to execute JavaScript outside the browser.
MongoDB is a NoSQL database that stores data in flexible documents.
Express.js is a backend framework for Node.js.
`;

function chunkText(text, chunkSize, overlap) {
    const chunks = [];

    let start = 0;

    while (start < text.length) {
        const end = start + chunkSize;

        chunks.push(text.slice(start, end));

        start += chunkSize - overlap;
    }

    return chunks;
}

const chunks = chunkText(text, 100, 20);
//means each chunk can contain up to 100 characters, with 20 characters overlapping with the previous chunk.

console.log("Total chunks:", chunks.length);

chunks.forEach((chunk, index) => {
    console.log(`\nChunk ${index}:`);
    console.log(chunk);
});