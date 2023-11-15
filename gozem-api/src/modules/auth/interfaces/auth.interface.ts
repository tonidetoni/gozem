import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

declare global {
  namespace Express {
    interface Request {
      currentUser?: IAuthPayload;
      data?: Record<string, any>;
    }
  }
}

export interface IAuthPayload {
  uid: string;
  email: string;
  lastname: string;
  firstname: string;
  role: string;
}

export interface IUserDocument extends Document {
  _id: ObjectId;
  uid: string;
  email: string;
  fullname: string;
  lastname: string;
  firstname: string;
  password: string;
  passwordResetToken?: string;
  passwordResetExpires?: number | string;
  createdAt: Date;
  role: string;
  comparePassword(password: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
}

export interface IUserPayload {
  _id: ObjectId;
  uid: string;
  lastname: string;
  firstname: string;
  password: string;
  passwordResetToken?: string | null;
  passwordResetExpires?: number | string | null;
  confirm: boolean;
  createdAt: Date;
}

export interface RegisterDto {
  email: string;
  lastname: string;
  firstname: string;
  password: string;
  role: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
