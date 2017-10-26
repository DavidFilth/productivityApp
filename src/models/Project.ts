import * as mongoose from "mongoose";

import { UserModel } from "./User";
import { SkillModel } from "./Skill";

export type ProjectModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    name: string;
    skillsRequired: [SkillModel, number];
    assets: Array<UserModel>;
    teamId: mongoose.Types.ObjectId;
    status: string;
    startDate: Date;
    finishDate: Date;
};

const ProjectSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    name: String,
    skillsRequired: [],
    assets: [],
    teamId: mongoose.Schema.Types.ObjectId,
    status: String,
    startDate: Date,
    finishDate: Date
});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;