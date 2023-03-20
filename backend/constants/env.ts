import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT,
  APP_ID: process.env.APP_ID,
};
