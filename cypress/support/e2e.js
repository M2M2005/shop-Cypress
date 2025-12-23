import { commands } from './commands'

if (!cy.commands) {
    cy.commands = commands;
}

if (!cy.dataSet) {
    /**
     * @type {typeof import('../../QALI.json')}
     */
    cy.dataSet = Cypress.env('dataSet');
}

const app = window.top;
if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
  const style = app.document.createElement('style');
  style.innerHTML =
    '.command-name-request, .command-name-xhr { display: none }';
  style.setAttribute('data-hide-command-log-request', '');
  app.document.head.appendChild(style);
}

Cypress.on('uncaught:exception', () => {
  return false;
})