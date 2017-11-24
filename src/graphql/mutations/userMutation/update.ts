import { GraphQLNonNull, GraphQLID } from "graphql";
import { userType, userInputType } from "../../types/user";
import UserModel from "../../../models/User";

export default {
    type: userType,
    description: "Update an existing user from DB",
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(userInputType)
        }
    },
    resolve(root: object, args: {id: string, data: object}) {
        return UserModel.findByIdAndUpdate(args.id, { $set: {...args.data}}, {new: true});
    }
};