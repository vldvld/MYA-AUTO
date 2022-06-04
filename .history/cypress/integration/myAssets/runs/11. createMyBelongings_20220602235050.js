import MainPage from '../../../pageObjects/mainPage'
import myBelongings from '../../../pageObjects/myBelongings'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Creating an Other asset', function () 
{
    const mainpage = new MainPage()
    const mybelongings = new myBelongings()
    const newValue = 1000
    const currency = 'USD '
    const internationalNumberFormat = new Intl.NumberFormat('en-US')

    // Create a random Asset name
    const name = () => Cypress._.random(0, 1e6)
    const id = name()
    const testName = "AUTOMATEDOTHERASSET #" +`${id}`
    
    // Clear a web cache before tests to prevent browser issues 
    afterEach(() => {
        if (window.navigator && navigator.serviceWorker) {
          navigator.serviceWorker.getRegistrations()
          .then((registrations) => {
            registrations.forEach((registration) => {
              registration.unregister()
            })
          })
        }
    })    
    
   it('Go to the My belongings page and create an other asset', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests3@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToMyBelongings().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}others/summary`)
        mybelongings.myBelongingsPlusButton().click()

        mybelongings.nameField().type(testName).should('have.value', testName)
        cy.wait(150)
        mybelongings.priceField().type(newValue).should('have.value', '1,000')
        cy.wait(150)
        mybelongings.locationField().click()
        cy.wait(850)
        cy.get('li').first().click()
        mybelongings.saveAndClose().trigger("click")
        mybelongings.myBelongingsCreatedNotification().should('exist') 
    })  
})

