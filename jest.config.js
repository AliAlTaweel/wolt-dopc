export default {
  preset: "ts-jest", // Use ts-jest for TypeScript
  testEnvironment: "jsdom", // Use jsdom for React testing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"], // File extensions to support
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transform TypeScript files
  },
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"], // Match test files
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Map imports starting with @/ to src/
  },
};