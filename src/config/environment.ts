import * as dotenv from 'dotenv';

// Detectar entorno
const envFile = process.env.NODE_ENV === 'production'
  ? '.env'
  : '.env.development';

dotenv.config({ path: envFile });

export const environment = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST,
  PORT: process.env.PORT || 3000,

  DB_NAME: process.env.DB_NAME,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,

  JWT_SECRET: process.env.JWT_SECRET,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};