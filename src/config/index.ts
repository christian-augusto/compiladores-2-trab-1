import development from "./development.json";
import test from "./test.json";

const getServerEnv = (): string => {
  return String(process.env.ENV);
};

export const isProduction = (): boolean => {
  return getServerEnv() == "production";
};

export const isDevelopment = (): boolean => {
  return getServerEnv() == "development";
};

export const isTest = (): boolean => {
  return getServerEnv() == "test";
};

export const initConfig = () => {
  if (isProduction()) {
    return;
  }

  if (isTest()) {
    process.env = {
      ...test,
    };

    return;
  }

  process.env = {
    ...development,
  };
};

export const getLogs = (): boolean => {
  return String(process.env.LOGS) == "true" ? true : false;
};
