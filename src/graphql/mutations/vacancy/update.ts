import { vacancyType, vacancyInputType } from "../../types/vacancy";
import vacancyModel from "../../../models/Vacancy";
import { GraphQLNonNull, GraphQLID } from "graphql";

export default {
    type: vacancyType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(vacancyInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return vacancyModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};