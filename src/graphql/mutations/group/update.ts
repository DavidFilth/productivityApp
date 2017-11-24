import { groupType, groupInputType } from "../../types/group";
import groupModel from "../../../models/Group";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: groupType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(groupInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return groupModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};