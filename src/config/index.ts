import development from "./development.json";

export function initConfig() {
  if (isProduction()) {
    return;
  }

  process.env = {
    ...process.env,
    ...development,
  };
}

export function isProduction(): boolean {
  return process.env.ENV == "production";
}

export function IsDevelopment(): boolean {
  return process.env.ENV == "development";
}

export function GetLogs(): boolean {
  return Boolean(process.env.LOGS);
}
