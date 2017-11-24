import { Schema, model, Types, Document } from "mongoose";

export type DesignationModel = Document & {
    company: Types.ObjectId;
    name: string;
};

const DesignationSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String
});

export default model("Designation", DesignationSchema);