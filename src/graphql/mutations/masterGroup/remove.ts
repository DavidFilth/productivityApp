import { GraphQLNonNull, GraphQLID } from "graphql";
import masterGroupModel from "../../../models/MasterGroup";
import { masterGroupType } from "../../types/masterGroup";

export default {
    type: masterGroupType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return masterGroupModel.findByIdAndRemove(args.id).exec();
    }
};