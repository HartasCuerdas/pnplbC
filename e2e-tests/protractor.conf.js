exports.config = {
  allScriptsTimeout: 120000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 120000
  }
};
