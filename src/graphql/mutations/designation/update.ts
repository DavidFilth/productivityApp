import { designationType, designationInputType } from "../../types/designation";
import designationModel from "../../../models/Designation";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: designationType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(designationInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return designationModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};