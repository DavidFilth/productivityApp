import { Schema, model, Types, Document } from "mongoose";

const ProjectSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company" },
    name: String,
    skillsRequired: [{type: Schema.Types.ObjectId, ref: "Skill"}],
    teams: [{ type: Schema.Types.ObjectId, ref: "Team"}],
    assets: [{type: Schema.Types.ObjectId, ref: "User" }],
    status: String,
    startDate: Date,
    finishDate: Date
});

export default model("Project", ProjectSchema);