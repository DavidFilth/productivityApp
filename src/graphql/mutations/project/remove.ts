import { GraphQLNonNull, GraphQLID } from "graphql";
import projectModel from "../../../models/Project";
import { projectType } from "../../types/project";

export default {
    type: projectType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return projectModel.findByIdAndRemove(args.id).exec();
    }
};