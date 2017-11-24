import { GraphQLNonNull, GraphQLID } from "graphql";
import vacancyModel from "../../../models/Vacancy";
import { vacancyType } from "../../types/vacancy";

export default {
    type: vacancyType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root: object, args: {id: string}) {
        return vacancyModel.findByIdAndRemove(args.id).exec();
    }
};