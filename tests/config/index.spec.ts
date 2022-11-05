import * as config from "@config";

describe("@Config", function () {
  const oldEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...oldEnv,
      ENV: "test",
    };
  });

  describe("initConfig function", () => {
    it("when ENV is test", () => {
      process.env.ENV = "test";
      process.env.LOGS = "false";

      config.initConfig();

      expect(process.env.ENV).toBe("test");
      expect(process.env.LOGS).toBe("false");
    });

    it("when ENV is development", () => {
      process.env.ENV = "development";
      process.env.LOGS = "true";

      config.initConfig();

      expect(process.env.ENV).toBe("development");
      expect(process.env.LOGS).toBe("true");
    });

    it("when ENV is production", function () {
      process.env.ENV = "production";
      process.env.LOGS = "true";

      config.initConfig();

      expect(process.env.ENV).toBe("production");
      expect(process.env.LOGS).toBe("true");
    });
  });

  describe("isProduction function", () => {
    it("when ENV is test", () => {
      config.initConfig();

      expect(config.isProduction()).toBe(false);
    });

    it("when ENV is development", () => {
      process.env.ENV = "development";

      config.initConfig();

      expect(config.isProduction()).toBe(false);
    });

    it("when ENV is production", () => {
      process.env.ENV = "production";

      config.initConfig();

      expect(config.isProduction()).toBe(true);
    });
  });

  describe("isDevelopment function", () => {
    it("when ENV is test", () => {
      config.initConfig();

      expect(config.isDevelopment()).toBe(false);
    });

    it("when ENV is development", () => {
      process.env.ENV = "development";

      config.initConfig();

      expect(config.isDevelopment()).toBe(true);
    });

    it("when ENV is production", () => {
      process.env.ENV = "production";

      config.initConfig();

      expect(config.isDevelopment()).toBe(false);
    });
  });

  describe("isTest function", () => {
    it("when ENV is test", () => {
      config.initConfig();

      expect(config.isTest()).toBe(true);
    });

    it("when ENV is development", () => {
      process.env.ENV = "development";

      config.initConfig();

      expect(config.isTest()).toBe(false);
    });

    it("when ENV is production", () => {
      process.env.ENV = "production";

      config.initConfig();

      expect(config.isTest()).toBe(false);
    });
  });

  describe("getLogs function", () => {
    it("when ENV is test", () => {
      config.initConfig();

      expect(config.getLogs()).toBe(false);
    });

    it("when ENV is development", () => {
      process.env.ENV = "development";

      const logsValue = "true";

      process.env.LOGS = logsValue;

      config.initConfig();

      expect(config.getLogs()).toBe(true);
    });

    it("when ENV is production", () => {
      process.env.ENV = "production";

      const logsValue = "true";

      process.env.LOGS = logsValue;

      config.initConfig();

      expect(config.getLogs()).toBe(true);
    });
  });
});
