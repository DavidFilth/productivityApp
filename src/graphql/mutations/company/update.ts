import { companyType, companyInputType } from "../../types/company";
import companyModel from "../../../models/Company";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: companyType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(companyInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return companyModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};