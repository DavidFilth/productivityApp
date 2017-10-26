import * as mongoose from "mongoose";

import { UserModel } from "./User";

export type GroupModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    name: string;
    members: Array<UserModel>;
};

const GroupSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    name: String,
    members: []
});

const Group = mongoose.model("Group", GroupSchema);
export default Group;