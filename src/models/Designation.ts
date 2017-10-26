import * as mongoose from "mongoose";

export type DesignationModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    name: string;
};

const DesignationSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    name: String
});

const Designation = mongoose.model("Designation", DesignationSchema);
export default Designation;