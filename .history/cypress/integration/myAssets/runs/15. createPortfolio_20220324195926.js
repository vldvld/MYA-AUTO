import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

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
        cy.loginCommand("automationtests3@gmail.com", "testuser1")
        mainpage.homePageUrl()
        
        mainpage.goToMyFinance().click()
        myfinance.traditionalInvestmentsTab().click()
        myfinance.myFinancePlusButton().click()

    })
    it('Check the collectibles Value widget', function()
    {
   
    })




    // it('Go to the MyFinance page and create the Cash account', function()
    // {
    //     cy.goToLoginPage()
    //     cy.loginCommand("automationtests3@gmail.com", "testuser1")
    //     mainpage.homePageUrl()
        
    //     mainpage.goToMyFinance().click()
    //     myfinance.cashAndBankingTab().click()
    //     myfinance.myFinancePlusButton().click()
    //     cy.contains('Account').should('exist')
    //     myfinance.selectAccountDropDown().click()
    //     myfinance.selectCashAccont().click()
    //     myfinance.nextButton().click()
    //     mainpage.modalTitle().should('have.text', 'Cash')
    //     myfinance.accountNameField().type('accountnametest')
    //     myfinance.balanceFieldCash().type(newValue).should('have.value', '1,000')
    //     cy.wait(200)
    //     myfinance.createButton().click()
    //     myfinance.cashAccountCreatedNotification().should('exist') 
    //     myfinance.transactionCreatedNotification().should('exist')     
    // })
    // it('Check the collectibles Value widget', function()
    // {
    //     myfinance.cbValueWidget().then($valueState => {
    //     const previousValueCBWidget = $valueState.text() 
    //     myfinance.cbValueWidget().should('have.text', previousValueCBWidget) 
    //     const previousValueInt = previousValueCBWidget.substr(4)  
    //     const resultValueCBWidget = parseInt(previousValueInt.replace(",", "") ) + newValue 
    //     myfinance.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(resultValueCBWidget, { timeout: 18000 }))   
    // })
})  
})
