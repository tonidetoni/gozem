import { config } from '@root/config';

export const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 24 * 7 * 3600000,
  secure: config.NODE_ENV !== 'dev',
  sameSite: 'lax'
};
