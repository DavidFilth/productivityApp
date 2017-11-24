import { GraphQLNonNull, GraphQLList, GraphQLID } from "graphql";
import articleModel from "../../models/Article";
import { articleType } from "../types/article";

export default {
    Article: {
        type: articleType,
        args: {
            id: {
                name: "id",
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(root: object, args: {id: string}) {
            return articleModel.findById(args.id).exec();
        }
    }
};