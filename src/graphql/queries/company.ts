import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import CompanyModel from "../../models/Company";
import { companyType } from "../types/company";

export default {
    Company: {
        type: companyType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return CompanyModel.findById(args.id).exec();
        }
    }
};