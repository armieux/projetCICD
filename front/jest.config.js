module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Transform JSX with babel-jest
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Run this setup file after Jest has been configured
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: './reports', // Specify the output directory
            outputName: 'junit.xml', // Specify the output file name
        }]
    ],
};
