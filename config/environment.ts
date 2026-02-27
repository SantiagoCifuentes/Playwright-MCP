import rawConfig from './config.json';

export const config = {
  url: process.env.BASE_URL || rawConfig.url,
  username: process.env.USERNAME || rawConfig.username,
  password: process.env.PASSWORD || rawConfig.password, //these can be set as environment variables in CI/CD pipeline or .env file for local development
  appName: rawConfig.appName
};