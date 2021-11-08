import Login from '../pageObjects/login'
import Signup from '../pageObjects/signup'
import MainPage from '../pageObjects/mainPage'
import myFinance from '../pageObjects/myFinance'

describe('Creating and testing a credit card account', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const currency = 'USD '
    const newValue = 1000
    const internationalNumberFormat = new Intl.NumberFormat('en-US')

   it('Go to the MyFinance page and create the Credit card account', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests@gmail.com", "testuser1")
        cy.url().should('eq', 'https://myassetstest.web.app/finances/accounts')

        myfinance.myFinancePlusButton().click()
        cy.contains('Account').should('exist')
        myfinance.selectAccountDropDown().click()
        myfinance.selectCreditAccount().click()
        myfinance.nextButton().click()
        myfinance.modalTitle().should('have.text', 'Credit Card Account')
        myfinance.accountNameField().type('accountnametest')
        myfinance.bankInstitutionField().type("ZIA")
    //    cy.wait(1300)
    //    cy.contains('ZIA Credit Union').should('exist')

        myfinance.ziaBankInstitution().should('exist')
        myfinance.bankInstitutionField().tab().type('{enter}')
        myfinance.bankInstitutionField().should('have.value', 'ZIA Credit Union')
        myfinance.balanceFieldCash().type(newValue).should('have.value', '1,000')
        myfinance.createButton().click()
        myfinance.creditAccountCreatedNotification().should('exist')
        myfinance.transactionCreatedNotification().should('exist')
        
})
    it('Check the C&B collectibles widget ', function()
    {
    
    })
})