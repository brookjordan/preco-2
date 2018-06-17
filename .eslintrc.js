module.exports = {
  root: true,

  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  plugins: [
    'ember',
  ],

  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
  ],

  env: {
    browser: true,
  },

  rules: {
    'no-unused-vars': [ 'error', {
      vars: 'all',
      args: 'none',
    }],
  },

  overrides: [
    // node files
    {
      files: [
        'testem.js',
        'ember-cli-build.js',
        'config/**/*.js',
        'lib/*/index.js',
        'fastbook-server.js',
        'ajax/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2018,
      },
      env: {
        browser: false,
        node: true,
      },
    },
  ],

  globals: {
    attachMediaStream: false,
    Skylink: false,
    AdapterJS: false,
  },
};
