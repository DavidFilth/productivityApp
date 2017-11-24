import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import messageModel from "../../models/Message";
import { messageType } from "../types/message";

export default {
    Message: {
        type: messageType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return messageModel.findById(args.id).exec();
        }
    }
};