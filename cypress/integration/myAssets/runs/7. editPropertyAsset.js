
import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'
import myProperty from '../../../pageObjects/myProperty'

describe('Creating and testing the Mortgage account', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage= new MainPage()
    const myfinance = new myFinance()
    const myproperty = new myProperty()
    const currency = 'USD '
    const newValue = 1000
    const internationalNumberFormat = new Intl.NumberFormat('en-US')

   it('Go to the MyFinance page and create the Mortgage ccount', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests1@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToMyProperty().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}properties/summary`)

        myproperty.myPropertiesTab().click()
        cy.contains('Activity log').should('not.exist');
        cy.contains('AUTOMATEDPROPERTY',{ timeout: 18000 }).click()
    
})

})
it('Check the Net value C&B collectibles widgets', function()
  {
    
    })

