import { teamType, teamInputType } from "../../types/team";
import teamModel from "../../../models/Team";
import { GraphQLNonNull } from "graphql";

export default {
    type: teamType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(teamInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new teamModel(args.data).save();
    }
};