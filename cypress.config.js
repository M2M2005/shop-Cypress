const { defineConfig } = require('cypress')
const config = require('./config.json')

module.exports = defineConfig({
  e2e: {
    baseUrl: config.baseUrl,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.js',
    testIsolation: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      return config
    },
  },
})
