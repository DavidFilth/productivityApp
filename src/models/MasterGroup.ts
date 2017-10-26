import * as mongoose from "mongoose";

export type MasterGroupModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    name: string;
    members: Array<mongoose.Types.ObjectId>;
};

const MasterGroupSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    name: String,
    members: []
});

const MasterGroup = mongoose.model("MasterGroup", MasterGroupSchema);
export default MasterGroup;