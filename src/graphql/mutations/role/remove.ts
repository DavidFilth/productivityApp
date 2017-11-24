import { GraphQLNonNull, GraphQLID } from "graphql";
import roleModel from "../../../models/Role";
import { roleType } from "../../types/role";

export default {
    type: roleType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return roleModel.findByIdAndRemove(args.id).exec();
    }
};