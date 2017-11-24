import { articleType, articleInputType } from "../../types/article";
import articleModel from "../../../models/Article";
import { GraphQLNonNull } from "graphql";

export default {
    type: articleType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(articleInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new articleModel(args.data).save();
    }
};