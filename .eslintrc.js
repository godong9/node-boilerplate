module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  },
  "extends": "airbnb-base/legacy",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "no-console": 0,
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ],
    "comma-dangle": ["error", {
      "arrays": "always",
      "objects": "always",
      "imports": "ignore",
      "exports": "ignore",
      "functions": "ignore"
    }]
  }
};


