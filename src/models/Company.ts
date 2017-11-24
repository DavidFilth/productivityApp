import { Schema, model, Types, Document } from "mongoose";

export type CompanyModel = Document & {
    name: string;
    alias: string;
    mastergroup: Types.ObjectId
};

const companySchema = new Schema({
    name: { type: String, unique: true, required: true },
    alias: String,
    mastergroup: {type: Schema.Types.ObjectId, ref: "MasterGroup"}
}, { timestamps: true });

export default model("Company", companySchema);