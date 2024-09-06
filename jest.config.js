// jest.config.js
module.exports = {
  testEnvironment: 'jest-environment-jsdom', // Set the correct test environment
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Transpile TypeScript with Babel
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transformIgnorePatterns: ['/node_modules/'],
};
