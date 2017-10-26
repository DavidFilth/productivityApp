import * as mongoose from "mongoose";

export type VacancyCategoryModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    name: string;
};

const VacancyCategorySchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    name: String
});

const VacancyCategory = mongoose.model("VacancyCategory", VacancyCategorySchema);
export default VacancyCategory;