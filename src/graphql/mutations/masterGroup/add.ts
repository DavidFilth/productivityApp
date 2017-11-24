import { masterGroupType, masterGroupInputType } from "../../types/masterGroup";
import masterGroupModel from "../../../models/MasterGroup";
import { GraphQLNonNull } from "graphql";

export default {
    type: masterGroupType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(masterGroupInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new masterGroupModel(args.data).save();
    }
};