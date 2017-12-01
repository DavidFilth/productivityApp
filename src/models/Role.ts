import { Schema, model, Types, Document } from "mongoose";

const roleSchema = new Schema({
    name: { type: String, required: true },
    alias: String,
    permissions: String,
    company: {type: Schema.Types.ObjectId, ref: "company"}
}, { timestamps: true });

export default model("Role", roleSchema);