import { Schema, model, Types, Document } from "mongoose";

export type NotificationModel = Document & {
    company: Types.ObjectId;
    content: string;
    sender: string;
    users: Types.ObjectId[];
    notifType: string;
};
const NotificationSchema = new Schema(
    {
        company: {type: Schema.Types.ObjectId, ref: "Company"},
        content: String,
        sender: String,
        users: [{type: Schema.Types.ObjectId, ref: "User"}],
        notifType: String,
    }, 
    { timestamps: true}
);

export default model("Notification", NotificationSchema);
 