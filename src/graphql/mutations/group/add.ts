import { groupType, groupInputType } from "../../types/group";
import groupModel from "../../../models/Group";
import { GraphQLNonNull } from "graphql";

export default {
    type: groupType,
    args: {
        data: {
            name: "data",
            type: new GraphQLNonNull(groupInputType)
        }
    },
    resolve(root: object, args: {data: any}) {
        return new groupModel(args.data).save();
    }
};