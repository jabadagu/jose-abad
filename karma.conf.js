module.exports = function(config) {
    config.set({
  
      reporters: ['progress', 'coverage'],
      coverageReporter: {
        dir: require('path').join(__dirname, 'coverage'),
        subdir: '.',
        reporters: [
          { type: 'html' },
          { type: 'lcov' },
          { type: 'text-summary' }
        ]
      },
    });
  };
  