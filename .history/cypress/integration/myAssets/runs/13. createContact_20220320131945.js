import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'
import myProperty from '../../../pageObjects/myProperty'
import myCollection from '../../../pageObjects/myCollection'
import myBelongings from '../../../pageObjects/myBelongings'
import contacts from '../../../pageObjects/contacts'

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
    const contacts = new Contacts()

    const internationalNumberFormat = new Intl.NumberFormat('en-US')

    //Create random Contact name
    const name = () => Cypress._.random(0, 1e6)
    const id = name()
    const testName = "Contact #" +`${id}`

   it('Log in, go to the contacts page, create a new contact', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests3@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.personalAccountMenu().click()
        mainpage.contacts().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}contacts`)




        mainpage.goToMyBelongings().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}others/summary`)
        mybelongings.plusButton().click()


    })  
    
})

