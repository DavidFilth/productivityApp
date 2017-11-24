import { articleType, articleInputType } from "../../types/article";
import { GraphQLNonNull, GraphQLID } from "graphql";
import articleModel from "../../../models/Article";

export default {
    type: articleType,
    args: {
        id: {
            name: "id",
            type: new GraphQLNonNull(GraphQLID)
        },
        data: {
            name: "data",
            type: new GraphQLNonNull(articleInputType)
        }
    },
    resolve(root: object, args: { id: string, data: any}) {
        return articleModel.findByIdAndUpdate(args.id, {$set: {...args.data}}, { new: true });
    }
};