import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Create the Loan account and check the C&B widgets', function () 
{
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const currency = 'USD '
    const newValue = 1000
    const internationalNumberFormat = new Intl.NumberFormat('en-US')
    
   // Clear a web cache before tests to prevent browser issues 
    afterEach(() => {
        if (window.navigator && navigator.serviceWorker) {
          navigator.serviceWorker.getRegistrations()
          .then((registrations) => {
            registrations.forEach((registration) => {
              registration.unregister()
            })
          })
        }
    })    
    
    it('Go to the MyFinance page and create the loan account', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests5@gmail.com", "testuser1")
        mainpage.homePageUrl()
        
        mainpage.goToMyFinance().click()
        myfinance.cashAndBankingTab().click()
        myfinance.myFinancePlusButton().click()
        cy.contains('Account').should('exist')
        myfinance.selectAccountDropDown().click()
        myfinance.selectLoanAccount().click()
        myfinance.nextButton().click()
        mainpage.modalTitle().should('have.text', 'Loan Account')
        
        myfinance.accountNameField().type('accountnametest').should('have.value', 'accountnametest')
        myfinance.bankInstitutionField().type("Zion")
        myfinance.ziaBankInstitution().should('exist')
        myfinance.bankInstitutionField().tab().type('{enter}')

        myfinance.outstandingAmmount().type(newValue).should('have.value', '1,000')

        cy.wait(500) //I use this wait to prevent the 0 asset balance issue 
        
        myfinance.createButton().should('not.be.disabled').click()
        myfinance.loanAccountCreatedNotification().should('exist') 
        myfinance.transactionCreatedNotification().should('exist') 
    })

    it('Check the Liability widget', function()
    {
        myfinance.cbLiabilityWidget().then($valueLiabilityState => {
        const previousLiabilityWidget = $valueLiabilityState.text() 
        myfinance.cbLiabilityWidget().should('have.text', previousLiabilityWidget) 
        const previousLiabilityWidgetInt = previousLiabilityWidget.substr(5)  
        const resultLiabilityWidget = parseInt(previousLiabilityWidgetInt.replace(",", "")) + newValue 
        cy.log(resultLiabilityWidget)
        myfinance.cbLiabilityWidget().should('have.text', currency + '(' + internationalNumberFormat.format(resultLiabilityWidget) + ')' )   
    })
    
//PUT A NET VALUE TEST CODE HERE
})  
}) 


