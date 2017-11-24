import { seniorityLvlType, seniorityLvlInputType } from "../../types/seniorityLvl";
import seniorityLvlModel from "../../../models/SeniorityLvl";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: seniorityLvlType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(seniorityLvlInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return seniorityLvlModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};