import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import projectModel from "../../models/Project";
import { projectType } from "../types/project";

export default {
    Project: {
        type: projectType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return projectModel.findById(args.id).exec();
        }
    }
};