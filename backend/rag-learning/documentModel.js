import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        //content
        text: {
            type: String,
            required: true
        },

        embedding: {
            type: [Number],
            required: true
        },

        //Identity / ownership
        documentType: {
            type: String,
            required: true
        },

        userId: {
            type: String
        },

        jobId: {
            type: String
        },

        //Position
        chunkIndex: {
            type: Number,
            required: true
        }
    }
);

const Document = mongoose.model("Document", documentSchema);

export default Document;