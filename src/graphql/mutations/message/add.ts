import { messageType, messageInputType } from "../../types/message";
import messageModel from "../../../models/Message";
import { GraphQLNonNull } from "graphql";

export default {
    type: messageType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(messageInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new messageModel(args.data).save();
    }
};