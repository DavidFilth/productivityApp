import { masterGroupType, masterGroupInputType } from "../../types/masterGroup";
import masterGroupModel from "../../../models/MasterGroup";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: masterGroupType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(masterGroupInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return masterGroupModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};