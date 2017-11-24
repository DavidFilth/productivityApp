import { GraphQLNonNull, GraphQLID } from "graphql";
import skillModel from "../../../models/Skill";
import { skillType } from "../../types/skill";

export default {
    type: skillType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return skillModel.findByIdAndRemove(args.id).exec();
    }
};