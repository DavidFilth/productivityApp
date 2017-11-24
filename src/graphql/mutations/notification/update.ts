import { notificationType, notificationInputType } from "../../types/notification";
import notificationModel from "../../../models/Notification";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: notificationType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(notificationInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return notificationModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};