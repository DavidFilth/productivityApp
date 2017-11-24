import { empType, empTypeInput } from "../../types/empType";
import empTypeModel from "../../../models/EmpType";
import { GraphQLNonNull } from "graphql";

export default {
    type: empType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(empTypeInput)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new empTypeModel(args.data).save();
    }
};