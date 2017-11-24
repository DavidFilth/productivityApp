import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import skillModel from "../../models/Skill";
import { skillType } from "../types/skill";

export default {
    Skill: {
        type: skillType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return skillModel.findById(args.id).exec();
        }
    }
};