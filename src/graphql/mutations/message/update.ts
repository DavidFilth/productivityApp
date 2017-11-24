import { messageType, messageInputType } from "../../types/message";
import messageModel from "../../../models/Message";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: messageType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(messageInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return messageModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};