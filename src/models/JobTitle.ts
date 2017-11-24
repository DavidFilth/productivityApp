import { Schema, model, Types, Document } from "mongoose";

export type JobTitleModel = Document & {
    company: Types.ObjectId;
    name: string;
};

const JobTitleSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String
});

export default model("JobTitle", JobTitleSchema);