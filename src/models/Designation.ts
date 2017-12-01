import { Schema, model, Types, Document } from "mongoose";

const DesignationSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String
});

export default model("Designation", DesignationSchema);