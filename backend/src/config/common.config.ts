export const corsOptions = {
  preflightContinue: false,
  optionsSuccessStatus: 204,
  origin: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: [
    'Content-Type',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Authorization',
  ],
  exposedHeaders: ['Authorization'],
  credentials: true,
};

export const serverConfig = {
  DOMAIN: process.env.DOMAIN || 'localhost',
  JWT_SECRET: process.env.JWT_SECRET || 'JWT_SECRET',
  PORT: parseInt(process.env.PORT, 10) || 5000,
  PREFIX: 'api',
};
