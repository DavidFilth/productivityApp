import * as mongoose from "mongoose";

export type JobTitleModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    name: string;
};

const JobTitleSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    name: String
});

const JobTitle = mongoose.model("JobTitle", JobTitleSchema);
export default JobTitle;