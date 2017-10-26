import * as mongoose from "mongoose";

export type ArticleModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    author: string;
    title: string;
    content: string;
};

const ArticleSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    author: String,
    title: String,
    content: String
}, { timestamps: true });

const Article = mongoose.model("Article", ArticleSchema);
export default Article;