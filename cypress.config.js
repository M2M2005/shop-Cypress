const { defineConfig } = require('cypress')
const config = require('./QALI.json')

module.exports = defineConfig({
  e2e: {
    baseUrl: config.baseUrl,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    env: {
      dataSet: config
    },
    setupNodeEvents(on, config) {
      return config
    },
  },
})
