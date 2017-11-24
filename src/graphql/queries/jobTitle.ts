import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import jobTitleModel from "../../models/JobTitle";
import { jobTitleType } from "../types/jobTitle";

export default {
    JobTitle: {
        type: jobTitleType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return jobTitleModel.findById(args.id).exec();
        }
    }
};