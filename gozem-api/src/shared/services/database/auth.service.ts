import { IUserDocument, IUserPayload, RegisterDto } from '@modules/auth/interfaces/auth.interface';
import { UserModel } from '@modules/auth/models/user.schema';
import { IAuthService } from '@service/database/interfaces/auth-service.interface';
import { generateRandomString } from '@global/helpers/helpers';

export class AuthService {
  public async getUserByEmail(email: string): Promise<IUserDocument | null> {
    return await UserModel.findOne({ email }).exec();
  }

  public async getUser(payload: Partial<IUserPayload>): Promise<IUserDocument | null> {
    return UserModel.findOne({ ...payload });
  }

  public async createUser(dto: RegisterDto): Promise<IUserDocument> {
    return await UserModel.create({
      uid: await generateRandomString(),
      ...dto
    });
  }

  public async updateUser(userId: string, payload: Partial<IUserPayload>): Promise<void> {
    await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          ...payload
        }
      }
    );
  }
}

export const authService = new AuthService();
