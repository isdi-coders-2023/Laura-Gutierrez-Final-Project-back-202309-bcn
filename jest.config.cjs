/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./src/setupTest.ts"],
  testEnvironment: "node",
  testMatch: ["**/src/**/*.test.ts"],
  resolver: "jest-ts-webcompat-resolver",
  coveragePathIgnorePatterns: [
    "./src/setupTest.ts",
    "./src/server/app.ts",
    "./src/database",
    "src/index.ts",
  ],
};
