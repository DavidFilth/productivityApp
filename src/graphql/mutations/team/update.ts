import { teamType, teamInputType } from "../../types/team";
import teamModel from "../../../models/Team";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: teamType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(teamInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return teamModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};