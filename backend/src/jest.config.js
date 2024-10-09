module.exports = {
    // preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/__tests__/**/*.test.ts'],
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: 'test-results/junit',
            outputName: 'js-test-results.xml',
        }],
    ],
};