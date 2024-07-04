/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};