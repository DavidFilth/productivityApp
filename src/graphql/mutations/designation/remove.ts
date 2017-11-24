import { GraphQLNonNull, GraphQLID } from "graphql";
import designationModel from "../../../models/Designation";
import { designationType } from "../../types/designation";

export default {
    type: designationType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return designationModel.findByIdAndRemove(args.id).exec();
    }
};