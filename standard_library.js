const stdlib = {
  console: {
    log: (message) => console.log(message),
    error: (message) => console.error(message)
  },
  math: {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    // ... Additional math functions ...
  },
  // ... Additional standard library modules ...
};

module.exports = stdlib;
