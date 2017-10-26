import * as mongoose from "mongoose";

export type SkillModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    name: string;
};

const SkillSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    name: String
});

const Skill = mongoose.model("Skill", SkillSchema);
export default Skill;