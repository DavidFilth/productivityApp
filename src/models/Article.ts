import { Schema, model, Types, Document } from "mongoose";

export type ArticleModel = Document & {
    company: Types.ObjectId;
    author: String;
    title: string;
    content: string;
};

const ArticleSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    author: String,
    title: String,
    content: String
}, { timestamps: true });

export default model("Article", ArticleSchema);