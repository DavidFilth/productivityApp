import { Schema, model, Types, Document } from "mongoose";

export type SkillModel = Document & {
    company: Types.ObjectId;
    name: string;
};

const SkillSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String
});

export default model("Skill", SkillSchema);