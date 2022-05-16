require('dotenv').config({ path: '.test.env' })

module.exports = {
  skipJsErrors: true,
  hostname: 'localhost',
  //disableScreenshots: true,
  quarantineMode: true,
  src: './test/e2e/',
  appCommand: 'DOTENV_CONFIG_PATH=.test.env node index.js',
  appInitDelay: 3000,
  userVariables: {
    app_url: 'http://localhost:3000',
  },
}
