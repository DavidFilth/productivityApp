import { Schema, model, Types, Document } from "mongoose";

export type EmpTypeModel = Document & {
    company: Types.ObjectId;
    name: string;
};

const EmpTypeSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String
});

export default model("EmpType", EmpTypeSchema);