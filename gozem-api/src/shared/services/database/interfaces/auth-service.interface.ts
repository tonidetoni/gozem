import { IUserDocument, IUserPayload, RegisterDto } from '@modules/auth/interfaces/auth.interface';

export interface IAuthService {
  getUserByEmail(email: string): Promise<IUserDocument | null>;
  createUser(user: RegisterDto): Promise<IUserDocument>;
  getUser(payload: IUserPayload): Promise<IUserDocument | null>;
  updateUser(userId: string, payload: Partial<IUserPayload>): Promise<void>;
}
