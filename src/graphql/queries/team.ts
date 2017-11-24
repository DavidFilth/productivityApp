import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import teamModel from "../../models/Team";
import { teamType } from "../types/team";

export default {
    Team: {
        type: teamType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return teamModel.findById(args.id).exec();
        }
    }
};