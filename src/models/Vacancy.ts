import * as mongoose from "mongoose";

export type VacanyModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    name: string;
    location: string;
    jobTitle: string;
    telecommuting: boolean;
    empType: string;
    seniorLvl: string;
    categories: Array<string>;
    description: string;
    responsibilities: string;
    qualifications: string;
    optQualifications: string;
    otherDetails: string;
    applicants: Array<mongoose.Types.ObjectId>;
};

const VacancySchema = new mongoose.Schema({
    companyId: mongoose.Types.ObjectId,
    name: String,
    location: String,
    jobTitle: String,
    telecommuting: Boolean,
    empType: String,
    seniorLvl: String,
    categories: [],
    description: String,
    responsibilities: String,
    qualifications: String,
    optQualifications: String,
    otherDetails: String,
    applicants: []
}, { timestamps: true });

const Vacancy = mongoose.model("Vacancy", VacancySchema);
export default Vacancy;