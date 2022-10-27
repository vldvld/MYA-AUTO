import MainPage from '../../../pageObjects/mainPage'
import myContacts from '../../../pageObjects/myContacts'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Creating a new contact', function () 
{
    const mainpage = new MainPage()
    const mycontacts = new myContacts()

    const internationalNumberFormat = new Intl.NumberFormat('en-US')

    // Create a random Contact name
    const name = () => Cypress._.random(0, 1e6)
    const id = name()
    const testName = "AContact #" +`${id}` 
    
    it('Log in, go to the Contacts page and create a new contact', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests7@gmail.com", "automationtests7@gmail.com")
        mainpage.homePageUrl()

        mainpage.personalAccountMenu().click()
        mainpage.contacts().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}contacts`)

        mycontacts.plusButton().click()
        mycontacts.createButton().should('be.disabled')
        mycontacts.firstName().type(testName).should('have.value', testName)
        mycontacts.lastName().type('TEST_LAST_NAME').should('have.value', 'TEST_LAST_NAME').tab().type('{enter}')
        cy.get('#menu-').contains('Supplier', { timeout: 25000 }).click()
        mycontacts.companyField().type('QA').should('have.value', 'QA')
        mycontacts.positionField().type('QA_ENGINEER').should('have.value', 'QA_ENGINEER')
        mycontacts.emailField().type('QA_ENGINEER@TESTMAIL.COM').should('have.value', 'QA_ENGINEER@TESTMAIL.COM')
        mycontacts.phoneField().type('+380999999999').should('have.value', '+380999999999')
        mycontacts.addressSearchField().type('London')
        mycontacts.createButton().should('not.be.disabled').click()
        mycontacts.contactCreatedNotification().should('exist')
//      cy.contains(testName+' TEST_LAST_NAME').should('exist')
    })  
})

