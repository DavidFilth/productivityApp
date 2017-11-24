import { Schema, model, Types, Document } from "mongoose";

export type GroupModel = Document & {
    company: Types.ObjectId;
    name: string;
    members: Types.ObjectId[];
};

const GroupSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String,
    members: [
        {type: Schema.Types.ObjectId, ref: "User"}
    ]
});

export default model("Group", GroupSchema);