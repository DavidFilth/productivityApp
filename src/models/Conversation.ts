import { Schema, model, Types, Document } from "mongoose";

const conversationSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    conversationType: String,
    conversationName: String,
    participants: [{ type: Schema.Types.ObjectId, ref: "Users" }]
}, { timestamps: true });


export default model("Conversation", conversationSchema);