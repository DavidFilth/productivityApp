import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import conversationModel from "../../models/Conversation";
import { conversationType } from "../types/conversation";

export default {
    Conversation: {
        type: conversationType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return conversationModel.findById(args.id).exec();
        }
    }
};