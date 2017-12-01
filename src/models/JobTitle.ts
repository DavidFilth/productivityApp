import { Schema, model, Types, Document } from "mongoose";

const JobTitleSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String
});

export default model("JobTitle", JobTitleSchema);