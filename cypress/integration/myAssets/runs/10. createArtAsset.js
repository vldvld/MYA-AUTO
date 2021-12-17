import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'
import myProperty from '../../../pageObjects/myProperty'
import myCollection from '../../../pageObjects/myCollection'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Creating an Art asset', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const myproperty = new myProperty()
    const mycollection = new myCollection()

    const newValue = 1000
    const currency = 'USD '
    const internationalNumberFormat = new Intl.NumberFormat('en-US')

    //Create random Asset name
    const name = () => Cypress._.random(0, 1e6)
    const id = name()
    const testName = "AUTOMATEDART #" +`${id}`

   it('Go to the My collectibles page and create an art asset', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests1@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToMyCollection().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}collections/all-assets/dashboard`)
        mycollection.myCollectionPlusButton().click()

    })  
    
})

