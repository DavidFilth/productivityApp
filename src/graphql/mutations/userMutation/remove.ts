import { GraphQLNonNull, GraphQLID } from "graphql";
import { userType } from "../../types/user";
import UserModel from "../../../models/User";

export default {
    type: userType,
    description: "Remove an existing user from DB",
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return UserModel.findByIdAndRemove(args.id).exec();
    }
};