import { GraphQLNonNull, GraphQLID } from "graphql";
import companyModel from "../../../models/Company";
import { companyType } from "../../types/company";

export default {
    type: companyType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return companyModel.findByIdAndRemove(args.id).exec();
    }
};