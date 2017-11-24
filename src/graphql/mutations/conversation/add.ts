import { conversationType, conversationInputType } from "../../types/conversation";
import conversationModel from "../../../models/Conversation";
import { GraphQLNonNull } from "graphql";

export default {
    type: conversationType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(conversationInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new conversationModel(args.data).save();
    }
};