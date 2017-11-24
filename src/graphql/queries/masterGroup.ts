import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import masterGroupModel from "../../models/MasterGroup";
import { masterGroupType } from "../types/masterGroup";

export default {
    MasterGroup: {
        type: masterGroupType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return masterGroupModel.findById(args.id).exec();
        }
    }
};