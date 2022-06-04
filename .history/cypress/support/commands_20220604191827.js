import 'cypress-file-upload'

import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

const mainpage = new MainPage()
const myfinance = new myFinance()
 

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
    cy.visit('Login page')
 });

 Cypress.Commands.add(
    "createCashAccount",
    
    () => {  
    mainpage.goToMyFinance().click()
    myfinance.cashAndBankingTab().click()
    myfinance.myFinancePlusButton().click()
    myfinance.selectAccountDropDown().click()
    myfinance.selectCashAccont().click()
    myfinance.nextButton().click()
    myfinance.accountNameField().type('accountnametest')
    myfinance.balanceFieldCash().type(newValue)
    myfinance.createButton().should('not.be.disabled').click()
    myfinance.cashAccountCreatedNotification().should('exist')
    myfinance.transactionCreatedNotification().should('exist')
 });


