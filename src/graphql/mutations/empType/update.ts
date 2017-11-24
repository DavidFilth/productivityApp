import { empType, empTypeInput } from "../../types/empType";
import empTypeModel from "../../../models/EmpType";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: empType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(empTypeInput)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return empTypeModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};