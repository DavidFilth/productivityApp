import { roleType, roleInputType } from "../../types/role";
import roleModel from "../../../models/Role";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: roleType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(roleInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return roleModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};