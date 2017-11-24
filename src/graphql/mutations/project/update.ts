import { projectType, projectInputType } from "../../types/project";
import projectModel from "../../../models/Project";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: projectType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(projectInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return projectModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};