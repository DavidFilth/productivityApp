import { activityType } from "../../types/activity";
import ActivityModel from "../../../models/Activity";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: activityType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return ActivityModel.findByIdAndRemove(args.id).exec();
    }
};