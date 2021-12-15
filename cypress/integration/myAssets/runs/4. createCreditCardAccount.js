import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Creating and testing the credit card account', function () 
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
        cy.loginCommand("automationtests1@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToMyFinance().click()
        myfinance.cashAndBankingTab().click()
        myfinance.myFinancePlusButton().click()
        cy.contains('Account').should('exist')
        myfinance.selectAccountDropDown().click()
        myfinance.selectCreditAccount().click()
        myfinance.nextButton().click()
        myfinance.modalTitle().should('have.text', 'Credit Card Account')
        myfinance.accountNameField().type('accountnametest')
        myfinance.bankInstitutionField().type("ZIA")
        myfinance.ziaBankInstitution().should('exist')
        myfinance.bankInstitutionField().tab().type('{enter}')
        myfinance.bankInstitutionField().should('have.value', 'ZIA Credit Union')
        myfinance.balanceFieldCash().type(newValue).should('have.value', '1,000')
        cy.wait(200)
        myfinance.createButton().click()
        myfinance.creditAccountCreatedNotification().should('exist')
        myfinance.transactionCreatedNotification().should('exist')
        
})
        it('Check the Net value C&B collectibles widgets', function()
      {
        myfinance.cbNetValueWidget().then($valueState => {
        const previousNetValueCBWidget = $valueState.text() 
        myfinance.cbNetValueWidget().should('have.text', previousNetValueCBWidget) 
        const previousNetValueInt = previousNetValueCBWidget.substr(5)  
        const resultNetValueCBWidget = parseInt(previousNetValueInt.replace(",", "") ) + newValue 
        myfinance.cbNetValueWidget().should('have.text', currency + '(' + internationalNumberFormat.format(resultNetValueCBWidget) + ')' )   
    })
})

        it('Check the Liability widget', function()
    {
        myfinance.myFinancePlusButton().click()
        cy.contains('Account').should('exist')
        myfinance.selectAccountDropDown().click()
        myfinance.selectCreditAccount().click()
        myfinance.nextButton().click()
        myfinance.modalTitle().should('have.text', 'Credit Card Account')
        myfinance.accountNameField().type('accountnametest')
        myfinance.bankInstitutionField().type("ZIA")
        myfinance.ziaBankInstitution().should('exist')
        myfinance.bankInstitutionField().tab().type('{enter}')
        myfinance.bankInstitutionField().should('have.value', 'ZIA Credit Union')
        myfinance.balanceFieldCash().type(newValue).should('have.value', '1,000')
        cy.wait(200)
        myfinance.createButton().click()
    
       myfinance.cbLiabilityWidget().then($valueLiabilityState => {
        const previousLiabilityWidget = $valueLiabilityState.text() 
        myfinance.cbLiabilityWidget().should('have.text', previousLiabilityWidget) 
        const previousLiabilityWidgetInt = previousLiabilityWidget.substr(5)  
        const resultLiabilityWidget = parseInt(previousLiabilityWidgetInt.replace(",", "")) + newValue 
        cy.log(resultLiabilityWidget)
        myfinance.cbLiabilityWidget().should('have.text', currency + '(' + internationalNumberFormat.format(resultLiabilityWidget) + ')' )   
      })
})  


})
