import 'cypress-file-upload';

Cypress.Commands.add(
    'iframeLoaded',
    {prevSubject: 'element'},
    ($iframe) => {
        const contentWindow = $iframe.prop('contentWindow');
        return new Promise(resolve => {
            if (
                contentWindow &&
                contentWindow.document.readyState === 'complete'
            ) {
                resolve(contentWindow)
            } else {
                $iframe.on('load', () => {
                    resolve(contentWindow)
                })
            }
        })
    });


Cypress.Commands.add(
    'getInDocument',
    {prevSubject: 'document'},
    (document, selector) => Cypress.$(selector, document)
);

Cypress.Commands.add(
    'getWithinIframe',
    (targetElement) => cy.get('iframe').iframeLoaded().its('document').getInDocument(targetElement)
);

Cypress.Commands.add(
    "loginCommand",
    (username, password) => {
    cy.get('[name="email"]').type(username).should('have.value', username)
    cy.get('[name="password"]').type(password).should('have.value', password)
    cy.get('[data-cy=login-btn]').click()
});

Cypress.Commands.add(
    "goToLoginPage",
    () => {
    cy.visit('Login page', {
        onBeforeLoad: function(win) {
          const promise = new Promise(function(resolve) {});
          return win.navigator.serviceWorker.register = function() {
            return promise;
          }
        }
      })


