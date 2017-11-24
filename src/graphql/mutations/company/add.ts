import { companyType, companyInputType } from "../../types/company";
import companyModel from "../../../models/Company";
import { GraphQLNonNull } from "graphql";

export default {
    type: companyType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(companyInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new companyModel(args.data).save();
    }
};