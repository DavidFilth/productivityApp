import { Schema, model, Types, Document } from "mongoose";

export type MasterGroupModel = Document & {
    company: Types.ObjectId;
    name: string;
    members: Types.ObjectId[];
};

const MasterGroupSchema = new Schema({
    company: Schema.Types.ObjectId,
    name: String,
    members: [
        {type: Schema.Types.ObjectId, ref: "User"}
    ]
});

export default model("MasterGroup", MasterGroupSchema);