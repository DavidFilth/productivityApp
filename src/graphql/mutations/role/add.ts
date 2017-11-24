import { roleType, roleInputType } from "../../types/role";
import roleModel from "../../../models/Role";
import { GraphQLNonNull } from "graphql";

export default {
    type: roleType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(roleInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new roleModel(args.data).save();
    }
};