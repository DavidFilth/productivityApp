import { Schema, model, Types, Document } from "mongoose";

export type ConversationModel = Document & {
    company: Types.ObjectId,
    owner: Types.ObjectId,
    conversationType: string,
    conversationName: string,
    participants: Types.ObjectId[]
};

const conversationSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    conversationType: String,
    conversationName: String,
    participants: [{ type: Schema.Types.ObjectId, ref: "Users" }]
}, { timestamps: true });


export default model("Conversation", conversationSchema);