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

    //Create a random Portfolio name
    const name = () => Cypress._.random(0, 1e6)
    const id = name()
    const testName = "AutoPortfolio #" +`${id}`

   it('Go to the MyFinance page and create the Cash account', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests3@gmail.com", "testuser1")
        mainpage.homePageUrl()
        
        mainpage.goToMyFinance().click()
        myfinance.TITab().click()
        myfinance.myFinancePlusButton().click()

        myfinance.TIName().type(testName).should('have.value', testName)
        myfinance.TIPremium().type('1000').should('have.value', '1,000')
        myfinance.TIPortfolioType().click()
        cy.contains('Lump sum').click()
        myfinance.TICompany().type('TestAutoCompany')
        cy.contains('Add company: TestAutoCompany', { timeout: 10000 }).click()
        myfinance.TICompany().should('have.value', 'TestAutoCompany')
        myfinance.TIProduct().type('TestAutoProduct')
        cy.contains('Add company: TestAutoProduct', { timeout: 10000 }).click()
        myfinance.TIProduct().should('have.value', 'TestAutoProduct')
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
