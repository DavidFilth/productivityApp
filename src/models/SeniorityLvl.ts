import * as mongoose from "mongoose";

export type SeniorityLvlModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    name: string;
};

const SeniorityLvlSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    name: String
});

const SeniorityLvl = mongoose.model("SeniorityLvl", SeniorityLvlSchema);
export default SeniorityLvl;