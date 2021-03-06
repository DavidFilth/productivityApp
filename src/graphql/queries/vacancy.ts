import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import vacancyModel from "../../models/Vacancy";
import { vacancyType } from "../types/vacancy";

export default {
    Vacancy: {
        type: vacancyType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return vacancyModel.findById(args.id).exec();
        }
    },
    Vacancies: {
        type: new GraphQLList(vacancyType),
        args: {
            company: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root, args) {
            return vacancyModel.find({company: args.company}).exec();
        }
    }
};