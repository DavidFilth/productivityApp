import { vacancyType, vacancyInputType } from "../../types/vacancy";
import vacancyModel from "../../../models/Vacancy";
import { GraphQLNonNull } from "graphql";

export default {
    type: vacancyType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(vacancyInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new vacancyModel(args.data).save();
    }
};