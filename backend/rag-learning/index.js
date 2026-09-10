import dotenv from "dotenv";
import axios from "axios";
import mongoose from 'mongoose';
import Document from "./documentModel.js";

dotenv.config();

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI,{
        dbName:'rag_learning'
    });

    console.log("MongoDB connected");
}

//This is the text we want to embed.
const chunks = [
    "React is a JavaScript library used to build user interfaces.",
    "Node.js is a runtime environment used to execute JavaScript outside the browser.",
    "MongoDB is a NoSQL database that stores data in flexible documents."
];

async function createEmbedding(text) {
    try {

        const response = await axios.post(
            "https://openrouter.ai/api/v1/embeddings",
            {
                model: "openai/text-embedding-3-small",
                input: text
            },//Use this embedding model and convert this text into an embedding.
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );//We're sending an HTTP POST request to OpenRouter's embeddings endpoint.

        // console.log('resp:',response);

        const embedding = response.data.data[0].embedding;

        console.log("Embedding created!");
        console.log("Vector length:", embedding.length);
        console.log("First 10 values:", embedding.slice(0, 10));
        return embedding;

    } catch (error) {
        console.error(
            "Embedding error:",
            error.response?.data || error.message
        );
    }
}


async function ingestChunks() {

    for (let i = 0; i < chunks.length; i++) {

        const embedding = await createEmbedding(chunks[i]);

        await Document.create({
            text: chunks[i],
            embedding: embedding,
            documentType: "test",
            chunkIndex: i
        });

        console.log(`Chunk ${i} stored`);
    }
}

async function main() {
    await connectDB();
    await ingestChunks();

    await mongoose.connection.close();
}

main();
