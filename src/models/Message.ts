import * as mongoose from "mongoose";

export type MessageModel = mongoose.Document & {
    userId: mongoose.Types.ObjectId;
    conversationId: mongoose.Types.ObjectId;
    msgContent: string;
    msgType: string;
    createdAt: Date;
};

const MessageSchema = new mongoose.Schema({
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    conversationId: mongoose.Schema.Types.ObjectId,
    msgContent: String,
    msgType: String,
    createdAt: Date
});

const Message = mongoose.model("Message", MessageSchema);
export default Message;
