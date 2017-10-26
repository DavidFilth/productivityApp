import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as mongoose from "mongoose";

import { NotificationModel } from "./Notification";
import { ConversationModel } from "./Conversation";
import { ProjectModel } from "./Project";
import { SkillModel } from "./Skill";

export type UserModel = mongoose.Document & {
  email: string,
  password: string,
  passwordResetToken: string,
  passwordResetExpires: Date,

  companyId: mongoose.Types.ObjectId,
  roleId: mongoose.Types.ObjectId,
  doj: Date,
  fte: Date,
  conversations: Array<ConversationModel>,
  notifications: Array<NotificationModel>,
  projects: Array<ProjectModel>,
  skills: [SkillModel, number],
  teams: Array<{}>,
  groups: Array<{}>,
  contacts: Array<{}>,


  facebook: string,
  tokens: AuthToken[],

  profile: {
    firstName: string,
    lastName: string,
    gender: string,
    birthday: Date,
    location: string,
    portfolio: string,
    picture: string
  },

  comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void,
  gravatar: (size: number) => string
};

export type AuthToken = {
  accessToken: string,
  kind: string
};

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,


  companyId: mongoose.Schema.Types.ObjectId,
  roleId: mongoose.Schema.Types.ObjectId,
  doj: Date,
  fte: Date,
  conversations: [],
  notifications: [],
  projects: [],
  skills: [],
  teams: [],
  groups: [],
  contacts: [],

  facebook: String,
  twitter: String,
  google: String,
  tokens: Array,

  profile: {
    firstName: String,
    lastName: String,
    gender: String,
    location: String,
    portfolio: String,
    picture: String
  }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
    cb(err, isMatch);
  });
};


/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size: number) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

// export const User: UserType = mongoose.model<UserType>('User', userSchema);
const User = mongoose.model("User", userSchema);
export default User;