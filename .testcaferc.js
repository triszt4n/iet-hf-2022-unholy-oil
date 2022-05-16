module.exports = {
  skipJsErrors: true,
  hostname: 'localhost',
  disableScreenshots: true,
  src: './test/e2e/',
  appCommand: 'DOTENV_CONFIG_PATH=.test.env node index.js',
  appInitDelay: 3000,
  userVariables: {
    app_url: 'http://localhost:3000',
  },
  hooks: {
    fixture: {
      before: async (ctx) => {
        require('dotenv').config({ path: '.test.env' })
      },
    },
  },
}
