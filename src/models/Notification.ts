import { Schema, model, Types, Document } from "mongoose";

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
 