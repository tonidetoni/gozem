import crypto from 'crypto';

export const generateRandomString = async (length = 12) => {
  const randomBytes: Buffer = await crypto.randomBytes(length);
  return randomBytes.toString('hex');
};
