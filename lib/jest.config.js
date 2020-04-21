const path = require('path');

module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
  testRegex: './src/__tests__/.*\\.test\\.(js|tsx|ts)$',
  testURL: 'http://localhost/',
  collectCoverage: true,
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: ['<rootDir>/src/__tests__/'],
  globals: {
    'ts-jest': {
      tsConfig: path.resolve(__dirname, 'src', '__tests__', 'tsconfig.json'),
    },
  },
};
