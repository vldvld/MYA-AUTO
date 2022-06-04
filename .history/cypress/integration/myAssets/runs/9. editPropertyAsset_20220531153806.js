import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'
import myProperty from '../../../pageObjects/myProperty'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Editing of the Property asset', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage= new MainPage()
    const myfinance = new myFinance()
    const myproperty = new myProperty()
    const currency = 'USD '
    const newValue = 1000
    const internationalNumberFormat = new Intl.NumberFormat('en-US')

    Cypress.on('uncaught:exception', (err, runnable) => {
      return false
  })

   it('Go to the Property page and edit the property', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests1@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToMyProperty().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}properties/summary`)

        myproperty.myPropertiesTab().click()
        cy.contains('Activity log').should('not.exist');
        cy.contains('AUTOMATEDPROPERTY',{ timeout: 30000 }).click()
    
})

})

