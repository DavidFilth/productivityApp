import { projectType, projectInputType } from "../../types/project";
import projectModel from "../../../models/Project";
import { GraphQLNonNull } from "graphql";

export default {
    type: projectType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(projectInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new projectModel(args.data).save();
    }
};