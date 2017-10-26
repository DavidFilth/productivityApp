import * as mongoose from "mongoose";

export type ConversationModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId,
    owner: mongoose.Types.ObjectId,
    conversationType: string,
    conversationName: string,
    participants: mongoose.Types.ObjectId
};

const conversationSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    owner: mongoose.Schema.Types.ObjectId,
    conversationType: String,
    conversationName: String,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }]
}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;