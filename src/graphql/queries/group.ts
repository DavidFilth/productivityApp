import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import groupModel from "../../models/Group";
import { groupType } from "../types/group";

export default {
    Group: {
        type: groupType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return groupModel.findById(args.id).exec();
        }
    }
};