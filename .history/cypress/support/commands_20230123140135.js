import 'cypress-file-upload'

import MainPage from '../pageObjects/mainPage'
import myFinance from '../pageObjects/myFinance'

const mainpage = new MainPage()
const myfinance = new myFinance()
 

Cypress.Commands.add(
    'iframeLoaded',
    { prevSubject: 'element' },
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
    { prevSubject: 'document' },
    (document, selector) => Cypress.$(selector, document)
);

Cypress.Commands.add(
    'getWithinIframe',
    (targetElement) => cy.get('iframe').iframeLoaded().its('document').getInDocument(targetElement)
);

Cypress.Commands.add(
    "loginCommand",
    (username, password) => {
        cy.get('[name="email"]').should('not.be.disabled').type(username).should('have.value', username)
        cy.get('[name="password"]').should('not.be.disabled').type(password).should('have.value', password)
        cy.get('[data-cy=login-btn]').should('not.be.disabled').click()
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
        myfinance.balanceFieldCash().type('1000')
        myfinance.createButton().should('not.be.disabled').click()
        myfinance.cashAccountCreatedNotification().should('exist')
        myfinance.transactionCreatedNotification().should('exist')
    })
Cypress.Commands.add(
    "wrapcheck",
    () => {
    cy.log('wrap commandresult is ' + this.wrapnetvalue)
    const wrapnetvaluetyconst = Number(this.wrapnetvalue) - newValue
    cy.log(wrapnetvaluetyconst)
    myfinance.cbNetValueWidget().should('have.text', currency + '(' + internationalNumberFormat.format(wrapnetvaluetyconst) + ')')
    })

import firebase from 'firebase'
const firebaseConfig ={ 
      apiKey: "AIzaSyATliT28o6HJdmQF9wOLhjxNw9PWUN-xTI",
    authDomain: "myassetstest.firebaseapp.com",
    projectId: "myassetstest",
    storageBucket: "myassetstest.appspot.com",
    messagingSenderId: "814204140209",
    appId: "1:814204140209:web:b4cbdc1cdf3300a1f20090",
    measurementId: "G-DPHDXHGF1X"
}
firebase.initializeApp(firebaseConfig)
