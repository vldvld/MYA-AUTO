import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

describe('Creating Cash account', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const currency = 'USD '
    const newValue = 1000
    const internationalNumberFormat = new Intl.NumberFormat('en-US')
    
   it('Go to the MyFinance page and create the Cash account', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests1@gmail.com", "testuser1")
        cy.url().should('eq', 'https://myassetstest.web.app/finances/accounts')
            
        myfinance.myFinancePlusButton().click()
        cy.contains('Account').should('exist')
        myfinance.selectAccountDropDown().click()
        myfinance.selectCashAccont().click()
        myfinance.nextButton().click()
        myfinance.modalTitle().should('have.text', 'Cash')
        myfinance.accountNameField().type('accountnametest')
        myfinance.balanceFieldCash().type(newValue).should('have.value', '1,000')
        myfinance.createButton().click()
        myfinance.cashAccountCreatedNotification().should('exist') 
        myfinance.transactionCreatedNotification().should('exist')     
    })
    it('Check the C&B collectibles widgets', function()
    {
        myfinance.cbValueWidget().then($valueState => {
        const previousValueCBWidget = $valueState.text() 
        myfinance.cbValueWidget().should('have.text', previousValueCBWidget) 
        const previousValueInt = previousValueCBWidget.substr(4)  
        const resultValueCBWidget = parseInt(previousValueInt.replace(",", "") ) + newValue 
        myfinance.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(resultValueCBWidget))   
    })
})  
})


