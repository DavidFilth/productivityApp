import * as mongoose from "mongoose";

export type EmpTypeModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    name: string;
};

const EmpTypeSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    name: String
});

const EmpType = mongoose.model("EmpType", EmpTypeSchema);
export default EmpType;