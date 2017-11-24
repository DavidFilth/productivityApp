import { GraphQLNonNull, GraphQLID } from "graphql";
import conversationModel from "../../../models/Conversation";
import { conversationType } from "../../types/conversation";

export default {
    type: conversationType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return conversationModel.findByIdAndRemove(args.id).exec();
    }
};