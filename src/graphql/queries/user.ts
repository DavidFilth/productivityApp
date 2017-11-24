import { GraphQLID, GraphQLNonNull, GraphQLList } from "graphql";
import userModel from "../../models/User";
import { userType } from "../types/user";

export default {
    User: {
        type: userType,
        args: {
            id: {
                name: "ID",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return userModel.findById(args.id).populate("company").exec();
        }
    }
};