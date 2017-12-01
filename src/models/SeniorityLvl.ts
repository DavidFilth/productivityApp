import { Schema, model, Types, Document } from "mongoose";

const SeniorityLvlSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String
});

export default model("SeniorityLvl", SeniorityLvlSchema);