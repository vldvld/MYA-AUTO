import 'cypress-file-upload'

import MainPage from '../pageObjects/mainPage'
import myFinance from '../pageObjects/myFinance'

// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'
// import 'firebase/compat/database'
// import 'firebase/compat/firestore'
// import { attachCustomCommands } from 'cypress-firebase'

// const fbconfig = {
//     type: "service_account",
//     project_id: "myassetstest",
//     private_key_id: "e926bd3ec327f757d1df33331037df5ebe092f7a",
//     private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCp1pp6itKT8avJ\nKB9O4JytcG/9luGl3WSDdGPsI2VZm57SpR6Dmbg2WzmBuGq81CrYvuFW4KtWeBhS\n8tqZMbchg52MjPc/zKP71Ux3eoB28kzWDAAnwf+LDKhPFR9ZohYNX3k8la/6FClK\nnz1/NmrPZsls//j3RD124lph+RnpGhlp+qEy/FMLi3syTZXsVmORaiRTgCl6FWbI\nNtIR95sybPj+A8E0h8Mpllp9/aMyFPnE9PqXAc+TA5UfupeFwi9J+OAZ1TbIcuI5\nafgXxPOJxiXCvWX7tgtXs6hQWQXM8Q8OuHb4wQDwsQX3A4V/C2CMi4wCZg5+c8ZY\nmhyuL0odAgMBAAECggEABWDuAH5//75yFctG/oz/eUCr00ihecrCoaUgevx9+7IB\nfCNNjZZjLpmB/zkzbCp99uJIqaMw2eqwvoPBZ4ObDJ0p8qcON3+IG/Qb2VbQVbQD\nue2kXZ33tVQfym1dUk3fS+ofoUsOSSm1Sw8y9+HlzQ6wx1pt7IrFNYwil6K3btnf\nBVyXPF6sAbay5Joqf39UDCq/rl9exP26ujpgEgNbfhKDrj0mQA7pXoQXQb/5ClwD\nwi1xL/XJFAroqVYhJM9OeX/gZlefP9RS1V36OPRreNmOr80HSMSC5nUdjDm6kISm\nXW0tQLun+dRKid5D3p1iFFy5+tavVILfMcM7ez164QKBgQDb4sMYtmAwMsKPcpM5\njSEabfQ4U2FOWmNzyWyYOgqSdFgUCPLAWAMHzkgnICCy/dajc6uu1u6BovHC08fI\n11y0FNLYtF7WxCjAlJxDQmSrqk8iH9zaY9CQC3/57ThPkUlErubfLG1ZGHql9p4t\nK9jE5Juj5mFWeD5EqIv6lqXzrQKBgQDFu5AFMTJSiIY9jOcvFaeud0xAGyBhVsSr\npWoqgDzGdDKmk2YscBRQHkFW2P5UIhrsR6QIK4LdOQdvd9KtwYVUn/uMpG08f+7G\neB1gGs0UOGRigU0Tyj7yY9H+BnZmZi6+Nyv7WQL2iioeXO2Mg6P/qFTCe0f7aE3X\ndOvAd/7+MQKBgQCDzMmqn27KlTJ/72qGHa0Q/YVc2cXCxHVGax73pBrALJK6954i\nYt72J9Sh9yUChRrKAMSQ2W4/MF9/q5feMBD2NGEp2fva+dt/i9SakEpth3lFeBnW\noeva27nLIkEVmH11eO0UKrokpIKnxkqLwvN9GZadSLNhtFOGrgyxmOlCRQKBgQCX\n/XzPAOn1lwvY9B4gizzBVuI9xJw3NkMmzZe146zTvy3P7S10qxJyI0+GOnYEpdKc\nHNVxkkCdW+DjRe+jsEWUrwTlLt7oyk34MQwje3Z4PICtV0awF54bI6+e28jXHWSA\nwlgEdH9akwmdHUFb6TR+qB2/AJRsI9jx7OXqpFJVgQKBgAnOvQkrfjjD6tGCYabW\nvTLttUZ7ILjLoTV5mrRJ0V8qcL/5UOyfPrWzY9LCpZYg+gvX6aLryfLKZB4Axybk\nsD12PBWFU8fXdmHtQHgSiKnJsxfdjOm/1iojpKbIjlDIbLWkIiUlfEZd00HPALYX\nQ6av/ERdHfB1QOr6hi37pFEd\n-----END PRIVATE KEY-----\n",
//     client_email: "firebase-adminsdk-8z5v3@myassetstest.iam.gserviceaccount.com",
//     client_id: "115512431659978685819",
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8z5v3%40myassetstest.iam.gserviceaccount.com"
//   }
// firebase.initializeApp(fbconfig)
// attachCustomCommands({ Cypress, cy, firebase})

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

    

    


