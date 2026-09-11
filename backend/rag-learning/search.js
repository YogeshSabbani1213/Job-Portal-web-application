import dotenv from "dotenv";
import axios from "axios";
import mongoose from "mongoose";
import Document from "./documentModel.js";

dotenv.config();

const query = "What is used to build user interfaces?";

async function createQueryEmbedding(text) {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/embeddings",
            {
                model: "openai/text-embedding-3-small",
                input: text
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const embedding = response.data.data[0].embedding;

        console.log("Query embedding created!");
        console.log("Vector length:", embedding.length);

        return embedding;

    } catch (error) {
        console.error(
            "Embedding error:",
            error.response?.data || error.message
        );
    }
}

async function searchDocuments(queryEmbedding) {
    const results = await Document.aggregate([
        {
            $vectorSearch: {
                index: "vector_index",
                path: "embedding",
                queryVector: queryEmbedding,
                numCandidates: 10,
                limit: 3
            }
        },
        {
            $project: {
                _id: 0,
                text: 1,
                documentType: 1,
                chunkIndex: 1,
                score: {
                    $meta: "vectorSearchScore"
                }
            }
        }
    ]);

    return results;
}



async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "rag_learning"
    });

    console.log("MongoDB connected");
}

async function main() {
    await connectDB();

    const queryEmbedding = await createQueryEmbedding(query);

    console.log("Query embedding ready:", queryEmbedding.length);

    const results = await searchDocuments(queryEmbedding);

    console.log("Search results:");
    console.dir(results, { depth: null });

    await mongoose.connection.close();
}

main();