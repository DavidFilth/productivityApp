import { Schema, model, Types, Document } from "mongoose";

const SkillSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String
});

export default model("Skill", SkillSchema);