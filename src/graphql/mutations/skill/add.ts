import { skillType, skillInputType } from "../../types/skill";
import skillModel from "../../../models/Skill";
import { GraphQLNonNull } from "graphql";

export default {
    type: skillType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(skillInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new skillModel(args.data).save();
    }
};