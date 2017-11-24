import { Schema, model, Types, Document } from "mongoose";

export type MessageModel = Document & {
    user: Types.ObjectId;
    conversation: Types.ObjectId;
    msgContent: string;
    msgType: string;
    createdAt: Date;
};

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    conversation: {type: Schema.Types.ObjectId, ref: "Conversation"},
    msgContent: String,
    msgType: String,
    createdAt: Date
});

export default model("Message", MessageSchema);
