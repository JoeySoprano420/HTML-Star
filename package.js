{
  "name": "html-star",
  "version": "1.0.0",
  "description": "A powerful and versatile programming language derived from HTML with advanced features.",
  "main": "index.js",
  "scripts": {
    "build": "node build.js",
    "test": "node test.js",
    "lint": "eslint .",
    "start": "node server.js"
  },
  "keywords": [
    "html",
    "programming",
    "language",
    "html-star",
    "dynamic",
    "strongly-typed"
  ],
  "author": "Joey Soprano",
  "license": "MIT",
  "dependencies": {
    "express": "^4.17.3",
    "body-parser": "^1.19.1",
    "some-html-star-specific-dependency": "^1.0.0"
  },
  "devDependencies": {
    "eslint": "^8.8.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-plugin-import": "^2.25.2"
  },
  "engines": {
    "node": ">=14.0.0"
  },
  "scripts": {
    "build": "node build.js",
    "start": "node server.js",
    "test": "node test.js",
    "lint": "eslint .",
    "setup": "node setup.js",
    "activate": "node activation.js"
  },
  "files": [
    "src/",
    "lib/",
    "build/"
  ],
  "bin": {
    "html-star": "./bin/html-star"
  }
}
