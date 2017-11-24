import { GraphQLNonNull } from "graphql";
import { userInputType, userType } from "../../types/user";
import UserModel from "../../../models/User";

export default {
    type: userType,
    description: "Add new users to the DB",
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(userInputType)
        }
    },
    resolve(root: object, args: any) {
        return new UserModel(args.data).save();
    }
};