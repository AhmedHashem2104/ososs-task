export default {
  testEnvironment: "jsdom", // Use jsdom for browser-like environment
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS imports
    "^@/(.*)$": "<rootDir>/src/$1", // Map @/ to src/ (if using path aliases)
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Use Babel for transforming files
  },
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"], // Look for test files in __tests__ folders
};
