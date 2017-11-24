import { seniorityLvlType, seniorityLvlInputType } from "../../types/seniorityLvl";
import seniorityLvlModel from "../../../models/SeniorityLvl";
import { GraphQLNonNull } from "graphql";

export default {
    type: seniorityLvlType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(seniorityLvlInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new seniorityLvlModel(args.data).save();
    }
};