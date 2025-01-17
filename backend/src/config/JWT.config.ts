export const jwtConfig = {
  ACCESS_TOKEN_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || '1m',
  REFRESH_TOKEN_EXPIRATION_TIME:
    process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME || '30d',
  COOKIE_TOKEN_NAME: 'refreshToken',
  COOKIE_EXPIRES_IN: parseInt(process.env.COOKIE_EXPIRES_IN) || 2592000000, // 7 day 604800000  // 30 day 2592000000
  DOMAIN: process.env.JWT_DOMAIN || 'localhost',
  SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
};
