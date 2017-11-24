import { conversationType, conversationInputType } from "../../types/conversation";
import conversationModel from "../../../models/Conversation";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: conversationType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(conversationInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return conversationModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};