import { designationType, designationInputType } from "../../types/designation";
import designationModel from "../../../models/Designation";
import { GraphQLNonNull } from "graphql";

export default {
    type: designationType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(designationInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new designationModel(args.data).save();
    }
};