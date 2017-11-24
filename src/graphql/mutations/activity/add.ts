import { activityType, activityInputType } from "../../types/activity";
import ActivityModel from "../../../models/Activity";
import { GraphQLNonNull } from "graphql";

export default {
    type: activityType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(activityInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new ActivityModel(args.data).save();
    }
};