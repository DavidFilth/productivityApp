import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import empTypeModel from "../../models/EmpType";
import { empType } from "../types/empType";

export default {
    EmpType: {
        type: empType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return empTypeModel.findById(args.id).exec();
        }
    }
};