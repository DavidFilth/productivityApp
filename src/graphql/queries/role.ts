import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import roleModel from "../../models/Role";
import { roleType } from "../types/role";

export default {
    Role: {
        type: roleType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return roleModel.findById(args.id).exec();
        }
    }
};