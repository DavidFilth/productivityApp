import { Schema, model, Types, Document } from "mongoose";

const VacancySchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String,
    location: String,
    jobTitle: {type: Schema.Types.ObjectId, ref: "JobTitle"},
    telecommuting: Boolean,
    empType: {type: Schema.Types.ObjectId, ref: "EmpType"},
    seniorLvl: {type: Schema.Types.ObjectId, ref: "SeniorityLvl"},
    categories: [],
    description: String,
    responsibilities: String,
    qualifications: String,
    optQualifications: String,
    otherDetails: String,
    applicants: [
        {type: Schema.Types.ObjectId, ref: "User"}
    ]
}, { timestamps: true });

export default model("Vacancy", VacancySchema);