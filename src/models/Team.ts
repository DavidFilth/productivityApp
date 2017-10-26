import * as mongoose from "mongoose";

export type TeamModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    name: string;
    projectId: mongoose.Types.ObjectId;
    location: string;
    meetings: {
        date: Date;
        time: Date;
        location: string;
    };
    members: Array<mongoose.Types.ObjectId>;
};

const TeamSchema = new mongoose.Schema({
    companyId: mongoose.Schema.Types.ObjectId,
    name: String,
    projectId: mongoose.Schema.Types.ObjectId,
    location: String,
    meetings: {
        date: Date,
        time: Date,
        location: String
    },
    members: []
});

const Team = mongoose.model("Team", TeamSchema);
export default Team;