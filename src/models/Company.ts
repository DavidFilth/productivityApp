import * as mongoose from "mongoose";

export type CompanyModel = mongoose.Document & {
    name: string;
    alias: string;
    mastergroupId: mongoose.Types.ObjectId
};

const companySchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    alias: String,
    mastergroupId: mongoose.Schema.Types.ObjectId
}, { timestamps: true });

const Company = mongoose.model("Company", companySchema);
export default Company;