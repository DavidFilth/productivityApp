import { GraphQLNonNull, GraphQLID } from "graphql";
import jobTitleModel from "../../../models/JobTitle";
import { jobTitleType } from "../../types/jobTitle";

export default {
    type: jobTitleType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return jobTitleModel.findByIdAndRemove(args.id).exec();
    }
};