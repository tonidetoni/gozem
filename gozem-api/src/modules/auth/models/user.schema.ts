import { model, Model, Schema } from 'mongoose';
import { omit } from 'lodash';
import { compare, hash } from 'bcrypt';
import { IUserDocument } from '@modules/auth/interfaces/auth.interface';

const SALT_ROUND = 10;

const userSchema: Schema = new Schema(
  {
    firstname: String,
    uid: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
    passwordResetToken: { type: String, default: '' },
    passwordResetExpires: { type: Number }
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        const doc = omit(ret, 'password');
        return { id: doc._id, ...doc };
      }
    }
  }
);

userSchema.virtual('fullname').get(function () {
  return `${this.firstname} ${this.lastname}`;
});

userSchema.index({ uid: 1 });

userSchema.pre('save', async function (this: IUserDocument, next: () => void) {
  if (!this.isModified('password')) return next();
  this.password = await hash(this.password as string, SALT_ROUND);
  next();
});

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  const hashedPassword: string = (this as IUserDocument).password!;
  return compare(password, hashedPassword);
};

userSchema.methods.hashPassword = async function (password: string): Promise<string> {
  return hash(password, SALT_ROUND);
};

export const UserModel: Model<IUserDocument> = model<IUserDocument>('User', userSchema, 'users');
