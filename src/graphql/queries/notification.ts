import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import notificationModel from "../../models/Notification";
import { notificationType } from "../types/notification";

export default {
    Notification: {
        type: notificationType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return notificationModel.findById(args.id).exec();
        }
    }
};