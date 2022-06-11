import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'
import myProperty from '../../../pageObjects/myProperty'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Creating a property asset', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const myproperty = new myProperty()
    const newValue = 1000
    const currency = 'USD '
    const internationalNumberFormat = new Intl.NumberFormat('en-US')


    const name = () => Cypress._.random(0, 1e6)
    const id = name()
    const testName = "AUTOMATEDPROPERTY #" +`${id}`
    
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
    
   it('Go to the Property page and create the property', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests5@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToMyProperty().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}properties/summary`)

        myproperty.myPropertyPlusButton().click()
        cy.contains('Property').should('exist')
        myproperty.propertyName().click().type(testName).should('have.value', testName)

        myproperty.propertyType().click().type('{downarrow}').type('{enter}')
        myproperty.locationField().type('London oxford')
        cy.wait(1000)
        cy.get('[role="option"]', { timeout: 20000 }).contains(/UK/).trigger('click'({force: true}))
        cy.wait(200)
      //  cy.get('li').last().click()
        myproperty.purchasePrice().type(newValue)
        
//        cy.contains('Additional details').click()
        cy.wait(250) 
        myproperty.createButton().trigger('click')  
        myproperty.propertyCreatedNotification().should('exist') 
        // cy.wait(300) 
        // cy.contains('Configuration').click()
        // myproperty.bedroomsNumber().type('1')
        // cy.contains('Configure').click()
        // cy.get('#kingBeds').type(1)
 

    })  
    it('Check the Collectibles Value widget', function()
    {   
        myproperty.propertyCollectiblesValue().then($valueState => {
        const previousValueWidget = $valueState.text() 
        myproperty.propertyCollectiblesValue().should('have.text', previousValueWidget) 
        const previousValueInt = previousValueWidget.substr(4)  
        const resultValueCBWidget = parseInt(previousValueInt.replace(",", "") ) + newValue 
        myproperty.propertyCollectiblesValue().should('have.text', currency + internationalNumberFormat.format(resultValueCBWidget)) 
      })
})
    
})

