import { Schema, model, Types, Document } from "mongoose";

export type VacanyModel = Document & {
    company: Types.ObjectId;
    name: string;
    location: string;
    jobTitle: Types.ObjectId;
    telecommuting: boolean;
    empType: Types.ObjectId;
    seniorLvl: Types.ObjectId;
    categories: Array<string>;
    description: string;
    responsibilities: string;
    qualifications: string;
    optQualifications: string;
    otherDetails: string;
    applicants: Types.ObjectId[];
};

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