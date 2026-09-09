function cosineSimilarity(a, b) {
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];

        magnitudeA += a[i] * a[i];
        magnitudeB += b[i] * b[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    return dotProduct / (magnitudeA * magnitudeB);
}

const vectorA = [1, 0];
const vectorB = [1, 0];
const vectorC = [0, 1];

console.log("A vs B:", cosineSimilarity(vectorA, vectorB));
console.log("A vs C:", cosineSimilarity(vectorA, vectorC));

/*
Two vectors
    ↓
Compare their directions
    ↓
Similarity score
    ↓
Higher = more similar*/