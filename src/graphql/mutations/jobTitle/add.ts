import { jobTitleType, jobTitleInputType } from "../../types/jobTitle";
import jobTitleModel from "../../../models/JobTitle";
import { GraphQLNonNull } from "graphql";

export default {
    type: jobTitleType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(jobTitleInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new jobTitleModel(args.data).save();
    }
};