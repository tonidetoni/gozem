import dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

class Config {
  public DATABASE_URL: string;
  public PORT: string;
  public JWT_TOKEN: string;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string;
  public SECRET_KEY_TWO: string;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public REDIS_PORT: number;

  private readonly DEFAULT_DATABASE_URL = 'mongodb://localhost:27017/monkapital';

  constructor() {
    this.PORT = process.env.PORT || '8000';
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
    this.REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }
}

export const config: Config = new Config();
