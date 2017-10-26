import * as mongoose from "mongoose";

export type NotificationModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    content: string;
    sender: string;
    users: Array<mongoose.Types.ObjectId>;
    notifType: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};
export type NotifTypesModel = mongoose.Document & {
    companyId: mongoose.Types.ObjectId;
    value: string;
};