import { GraphQLNonNull, GraphQLID } from "graphql";
import teamModel from "../../../models/Team";
import { teamType } from "../../types/team";

export default {
    type: teamType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return teamModel.findByIdAndRemove(args.id).exec();
    }
};