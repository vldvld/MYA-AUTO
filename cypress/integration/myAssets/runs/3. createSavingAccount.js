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

   it('Go to the MyFinance page and create the Saving account', function()
    {
        myfinance.myFinancePlusButton().click()
        cy.contains('Account').should('exist')
        myfinance.selectAccountDropDown().click()
        myfinance.selectSavingAccount().click()
        myfinance.nextButton().click()
        cy.contains('Saving Account').should('exist')
        cy.contains('Single-Currency Account').should('exist')
        myfinance.accountNameField().type('accountnametest')
        myfinance.bankInstitutionField().type("ZIA")
        cy.wait(1300)
        myfinance.bankInstitutionField().tab().type('{enter}')
        myfinance.bankInstitutionField().should('have.value', 'ZIA Credit Union')
        myfinance.balanceField().type("1000").should('have.value', '1,000')
        myfinance.nextButton().click()
        myfinance.createButton().click()
        myfinance.savingAccountCreatedNotification().should('exist')
        myfinance.transactionCreatedNotification().should('exist')
        
})
    it('Check the C&B collectibles widget ', function()
    {
    // Add tests here after updating web a selectors 
    })
})