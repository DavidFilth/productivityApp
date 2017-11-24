import { GraphQLNonNull, GraphQLID } from "graphql";
import empTypeModel from "../../../models/EmpType";
import { empType } from "../../types/empType";

export default {
    type: empType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return empTypeModel.findByIdAndRemove(args.id).exec();
    }
};