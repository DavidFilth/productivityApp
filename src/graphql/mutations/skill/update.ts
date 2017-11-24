import { skillType, skillInputType } from "../../types/skill";
import skillModel from "../../../models/Skill";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: skillType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(skillInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return skillModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};