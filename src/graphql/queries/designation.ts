import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import designationModel from "../../models/Designation";
import { designationType } from "../types/designation";

export default {
    Company: {
        type: designationType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return designationModel.findById(args.id).exec();
        }
    }
};