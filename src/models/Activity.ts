import * as mongoose from "mongoose";

export type ActivityModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    projectId: mongoose.Types.ObjectId;
    content: string;
    progress: number;
    users: Array<mongoose.Types.ObjectId>;
    dueAt: Date;
};

const ActivitySchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    projectId: mongoose.Schema.Types.ObjectId,
    content: String,
    progress: Number,
    users: [],
    dueAt: Date,
}, { timestamps: true });

const Activity = mongoose.model("Activity", ActivitySchema);
export default Activity;