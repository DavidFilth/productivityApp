import { GraphQLNonNull, GraphQLID } from "graphql";
import notificationModel from "../../../models/Notification";
import { notificationType } from "../../types/notification";

export default {
    type: notificationType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return notificationModel.findByIdAndRemove(args.id).exec();
    }
};