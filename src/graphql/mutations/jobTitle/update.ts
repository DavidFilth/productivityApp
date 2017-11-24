import { jobTitleType, jobTitleInputType } from "../../types/jobTitle";
import jobTitleModel from "../../../models/JobTitle";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: jobTitleType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(jobTitleInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return jobTitleModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};