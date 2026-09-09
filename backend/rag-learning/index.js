import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

//This is the text we want to embed.
const text = "React is a JavaScript library used to build user interfaces.";

async function createEmbedding() {
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

    } catch (error) {
        console.error(
            "Embedding error:",
            error.response?.data || error.message
        );
    }
}

createEmbedding();