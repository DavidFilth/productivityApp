import { Schema, model, Types, Document, Error } from "mongoose";
import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";

export type UserModel = Document & {
  email: string,
  password: string,
  passwordResetToken: string,
  passwordResetExpires: Date,
  company: Types.ObjectId,
  role: Types.ObjectId,
  doj: Date,
  fte: string,
  skills: [
    {
      skill: Types.ObjectId,
      grade: Number
    }
  ],
  conversations: Types.ObjectId[],
  teams: Types.ObjectId[],
  groups: Types.ObjectId[],
  contacts: Types.ObjectId[],
  profile: {
    firstName: string,
    lastName: string,
    gender: string,
    birthday: Date,
    location: string,
    portfolio: string,
    picture: string
  },
  comparePassword: (candidatePassword: string) => boolean,
  gravatar: (size: number) => string
};

const userSchema = new Schema({
  email: {type: String, unique: true},
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  company: {type: Schema.Types.ObjectId, ref: "Company"},
  role: {type: Schema.Types.ObjectId, ref: "Role"},
  doj: Date,
  fte: String,
  conversations: [
    {type: Schema.Types.ObjectId, ref: "Conversation"}
  ],
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  teams: [
    {type: Schema.Types.ObjectId, ref: "Team"}
  ],
  groups: [
    {type: Schema.Types.ObjectId, ref: "Group"}
  ],
  contacts: [
    {type: Schema.Types.ObjectId, ref: "User"}
  ],
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
    bcrypt.hash(user.password, salt, undefined, (err: Error, hash) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compareSync(candidatePassword, this.password);
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

export default model("User", userSchema);