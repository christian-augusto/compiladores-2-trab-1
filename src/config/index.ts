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
  if (isProduction() || isDevelopment()) {
    return;
  }

  process.env = {
    ...test,
  };
};

export const getLogs = (): boolean => {
  return Boolean(process.env.LOGS);
};
