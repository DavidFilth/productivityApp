import { GraphQLNonNull, GraphQLList, GraphQLID } from "graphql";
import ActivityModel from "../../models/Activity";
import { activityType } from "../types/activity";

export default {
    Activity: {
        type: activityType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return ActivityModel.findById(args.id).exec();
        }
    }
};