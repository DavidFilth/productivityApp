import { GraphQLNonNull, GraphQLID } from "graphql";
import messageModel from "../../../models/Message";
import { messageType } from "../../types/message";

export default {
    type: messageType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return messageModel.findByIdAndRemove(args.id).exec();
    }
};