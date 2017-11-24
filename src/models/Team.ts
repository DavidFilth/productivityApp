import { Schema, model, Types, Document } from "mongoose";

export type TeamModel = Document & {
    company: Types.ObjectId;
    name: string;
    location: string;
    meetings: {
        date: Date;
        time: Date;
        location: string;
    };
    members: Types.ObjectId[];
};

const TeamSchema = new Schema({
    company: {type: Schema.Types.ObjectId, ref: "Company"},
    name: String,
    location: String,
    meetings: {
        date: Date,
        time: Date,
        location: String
    },
    members: [{type: Schema.Types.ObjectId, ref: "User"}]
});

export default model("Team", TeamSchema);