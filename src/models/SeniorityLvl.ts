import { Schema, model, Types, Document } from "mongoose";

export type SeniorityLvlModel = Document & {
    company: Types.ObjectId;
    name: string;
};

const SeniorityLvlSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String
});

export default model("SeniorityLvl", SeniorityLvlSchema);