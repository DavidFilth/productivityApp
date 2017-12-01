import { Schema, model, Types, Document } from "mongoose";

const ActivitySchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    project: {type: Schema.Types.ObjectId , ref: "Project"},
    content: String,
    progress: Number,
    users: [ {type: Schema.Types.ObjectId, ref: "User"} ],
    dueAt: Date,
}, { timestamps: true });

export default model("Activity", ActivitySchema);