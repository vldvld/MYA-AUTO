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
    cy.get('[name="email"]').type(username)
    cy.get('[name="password"]').type(password)
    cy.get(':nth-child(4) > .MuiButtonBase-root').click()
});

Cypress.Commands.add(
    "goToLoginPage",
    () => {
    cy.visit('Login page')
 });
