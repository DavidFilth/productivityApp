import { Schema, model, Types, Document } from "mongoose";

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    conversation: {type: Schema.Types.ObjectId, ref: "Conversation"},
    msgContent: String,
    msgType: String,
    createdAt: Date
});

export default model("Message", MessageSchema);
