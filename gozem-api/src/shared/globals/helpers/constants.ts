import { config } from '@root/config';

export const EMAIL_QUEUE_NAME = 'email';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 24 * 7 * 3600000,
  secure: config.NODE_ENV !== 'dev',
  sameSite: 'none'
};

export const QUEUE_CONNECTION_OPTIONS = {
  host: config.REDIS_HOST,
  port: config.REDIS_PORT
};

export const DEFAULT_JOB_OPTIONS = {
  attempts: 3,
  removeOnComplete: {
    age: 60 * 60,
    count: 10
  },
  removeOnFail: {
    age: 60 * 60 * 3,
    count: 100
  },
  backoff: {
    type: 'exponential',
    delay: 10000
  }
};
