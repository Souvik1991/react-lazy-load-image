module.exports = {
    "verbose": true,
    "clearMocks": true,
    "collectCoverage": true,
    "collectCoverageFrom": [
        "src/**/*.{js,jsx}"
    ],
    "transform": {
        "^.+\\.js$": "babel-jest"
    },
    "globals": {
        "window": true,
        "document": true
    },
    "moduleFileExtensions": ["js", "jsx", "json"],
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/src/$1"
    },
    "transformIgnorePatterns": ["<rootDir>/node_modules/"],
    "coverageDirectory": "./coverage"
};