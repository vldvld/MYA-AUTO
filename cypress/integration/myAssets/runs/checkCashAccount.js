import Login from '../pageObjects/login'
import Signup from '../pageObjects/signup'
import MainPage from '../pageObjects/mainPage'
import myFinance from '../pageObjects/myFinance'

describe('Creating cash account', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const currency = 'AUD '
    const newValue = 1000
    const internationalNumberFormat = new Intl.NumberFormat('en-US')
    
    it('Log in into the system', function()
    {
        cy.visit('/')
        login.email().type('myassetstest117@gmail.com')
        login.password().type('testuser1')
        login.submitButton().click()
        cy.url().should('eq', 'https://myassetstest.web.app/finances/accounts')

    })
   it('Go to the MyFinance page and create the Cash account', function()
    {
        myfinance.myFinancePlusButton().click()
        cy.contains('Account').should('exist')
        myfinance.selectAccountDropDown().click()
        myfinance.selectCashAccont().click()
        myfinance.nextButton().click()
        cy.get('#customized-dialog-title').find('span').should('have.text', 'Cash')
        myfinance.accountNameField().type('accountnametest')
        myfinance.balanceFieldCash().type(newValue).should('have.value', '1,000')
        myfinance.createButton().click()
        myfinance.cashAccountCreatedNotification().should('exist')
        myfinance.transactionCreatedNotification().should('exist')     
    })
    it('Check the C&B collectibles widget ', function()
    {
        myfinance.cbValueWidget().then($valueState => {
        const previousValue = $valueState.text()
        myfinance.cbValueWidget().should('have.text', previousValue)
        const previousValueInt = previousValue.substr(4)
        const resultValue = parseInt(previousValueInt.replace(",", "") ) + newValue
        myfinance.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(resultValue))
    })    
    })
})


