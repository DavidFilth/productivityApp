import { activityType, activityInputType } from "../../types/activity";
import ActivityModel from "../../../models/Activity";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: activityType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(activityInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return ActivityModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};