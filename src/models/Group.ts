import { Schema, model, Types, Document } from "mongoose";

const GroupSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String,
    members: [
        {type: Schema.Types.ObjectId, ref: "User"}
    ]
});

export default model("Group", GroupSchema);