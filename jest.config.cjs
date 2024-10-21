module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    "^@vue/test-utils": "<rootDir>/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js"
  },
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@babel/runtime)'
  ],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue']
};