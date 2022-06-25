import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  transform: { "^.+\\.ts?$": "ts-jest" },
  testEnvironment: "node",
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};

export default config;
