import { GraphQLNonNull, GraphQLID } from "graphql";
import groupModel from "../../../models/Group";
import { groupType } from "../../types/group";

export default {
    type: groupType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return groupModel.findByIdAndRemove(args.id).exec();
    }
};