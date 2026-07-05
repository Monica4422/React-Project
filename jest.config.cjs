module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/test/styleMock.js'
  },
  collectCoverageFrom: ['src/**/*.{js,jsx}', '!src/main.jsx', '!src/test/**']
};
