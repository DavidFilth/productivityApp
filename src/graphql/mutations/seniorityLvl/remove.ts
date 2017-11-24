import { GraphQLNonNull, GraphQLID } from "graphql";
import seniorityLvlModel from "../../../models/SeniorityLvl";
import { seniorityLvlType } from "../../types/seniorityLvl";

export default {
    type: seniorityLvlType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return seniorityLvlModel.findByIdAndRemove(args.id).exec();
    }
};