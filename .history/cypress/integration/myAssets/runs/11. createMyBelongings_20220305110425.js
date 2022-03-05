import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'
import myProperty from '../../../pageObjects/myProperty'
import myCollection from '../../../pageObjects/myCollection'
import myBelongings from '../../../pageObjects/myBelongings'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Creating an Other asset', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const myproperty = new myProperty()
    const mycollection = new myCollection()
    const mybelongings = new myBelongings()

    const newValue = 1000
    const currency = 'USD '
    const internationalNumberFormat = new Intl.NumberFormat('en-US')

    //Create random Asset name
    const name = () => Cypress._.random(0, 1e6)
    const id = name()
    const testName = "AUTOMATEDOTHERASSET #" +`${id}`

   it('Go to the My belongings page and create an other asset', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests3@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToMyBelongings().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}others/summary`)
        mybelongings.myBelongingsPlusButton().click()

        mybelongings.nameField().type(testName).should('have.value', testName)
        mybelongings.priceField().type(newValue).should('have.value', '1,000').tab().type('1')
        mybelongings.saveAndClose().click()
        mybelongings.myBelongingsCreatedNotification().should('exist') 
    })  
    
})

