import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },

        embedding: {
            type: [Number],
            required: true
        },

        documentType: {
            type: String,
            required: true
        },

        chunkIndex: {
            type: Number,
            required: true
        }
    }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;