import pino from 'pino';

export const Log = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  }
});
