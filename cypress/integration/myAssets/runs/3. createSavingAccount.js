import Login from '../pageObjects/login'
import Signup from '../pageObjects/signup'
import MainPage from '../pageObjects/mainPage'
import myFinance from '../pageObjects/myFinance'

describe('Creating and testing a  saving account', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const currency = 'USD '
    const newValue = 1000
    const internationalNumberFormat = new Intl.NumberFormat('en-US')

   it('Go to the MyFinance page and create the Saving account', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests@gmail.com1", "testuser1")
        cy.url().should('eq', 'https://myassetstest.web.app/finances/accounts')
        
        myfinance.myFinancePlusButton().click()
        cy.contains('Account').should('exist')
        myfinance.selectAccountDropDown().click()
        myfinance.selectSavingAccount().click()
        myfinance.nextButton().click()
        myfinance.modalTitle().should('have.text', 'Saving Account')
        cy.contains('Single-Currency Account').should('exist')
        myfinance.accountNameField().type('accountnametest')
        myfinance.bankInstitutionField().type("ZIA")
        myfinance.ziaBankInstitution().should('exist')
        myfinance.bankInstitutionField().tab().type('{enter}')
        myfinance.bankInstitutionField().should('have.value', 'ZIA Credit Union')
        myfinance.balanceField().type(newValue).should('have.value', '1,000')
        myfinance.nextButton().click()
        myfinance.createButton().click()
        myfinance.savingAccountCreatedNotification().should('exist')
        myfinance.transactionCreatedNotification().should('exist')
        
})
    it('Check the C&B collectibles widget ', function()
    {
    
    })
})