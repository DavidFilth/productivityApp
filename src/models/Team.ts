import { Schema, model, Types, Document } from "mongoose";

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