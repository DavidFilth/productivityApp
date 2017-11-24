import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import seniorityLvlModel from "../../models/SeniorityLvl";
import { seniorityLvlType } from "../types/seniorityLvl";

export default {
    SeniorityLvl: {
        type: seniorityLvlType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return seniorityLvlModel.findById(args.id).exec();
        }
    }
};