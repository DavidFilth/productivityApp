import { Schema, model, Types, Document } from "mongoose";

const MasterGroupSchema = new Schema({
    company: Schema.Types.ObjectId,
    name: String,
    members: [
        {type: Schema.Types.ObjectId, ref: "User"}
    ]
});

export default model("MasterGroup", MasterGroupSchema);