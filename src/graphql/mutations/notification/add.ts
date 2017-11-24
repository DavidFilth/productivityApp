import { notificationType, notificationInputType } from "../../types/notification";
import notificationModel from "../../../models/Notification";
import { GraphQLNonNull } from "graphql";

export default {
    type: notificationType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(notificationInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new notificationModel(args.data).save();
    }
};