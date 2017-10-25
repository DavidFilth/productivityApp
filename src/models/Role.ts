import * as mongoose from "mongoose";

export type RoleModel = mongoose.Document & {
    name: string;
    alias: string;
    permissions: Array<mongoose.Types.ObjectId>;
};

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    alias: String,
    permissions: [mongoose.Schema.Types.ObjectId]
}, { timestamps: true });

const Role = mongoose.model("Role", roleSchema);
export default Role;