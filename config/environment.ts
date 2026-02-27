import rawConfig from './config.json';

export const config = {
  url: process.env.BASE_URL || rawConfig.url,
  username: process.env.E2E_USERNAME || rawConfig.username,
  password: process.env.E2E_PASSWORD || rawConfig.password,
  appName: rawConfig.appName
};