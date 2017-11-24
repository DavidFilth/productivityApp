import { Schema, model, Types, Document } from "mongoose";

export type RoleModel = Document & {
    name: string;
    alias: string;
    permissions: string;
    company: Types.ObjectId
};

const roleSchema = new Schema({
    name: { type: String, required: true },
    alias: String,
    permissions: String,
    company: {type: Schema.Types.ObjectId, ref: "company"}
}, { timestamps: true });

export default model("Role", roleSchema);