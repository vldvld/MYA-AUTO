import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Creating and testing the credit card account', function () 
{
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const currency = 'USD '
    const newValue = 1000
    const internationalNumberFormat = new Intl.NumberFormat('en-US')

    it('Go to the MyFinance page and create the Credit card account', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests5@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToMyFinance().click()
        myfinance.cashAndBankingTab().click()
        myfinance.myFinancePlusButton().click()
        cy.contains('Account').should('exist')
        myfinance.selectAccountDropDown().click()
        myfinance.selectCreditAccount().click()
        myfinance.nextButton().click()
        mainpage.modalTitle().should('have.text', 'Credit Card Account')
        myfinance.accountNameField().type('accountnametest')
        myfinance.bankInstitutionField().type("Zion")
        myfinance.ziaBankInstitution().should('exist')
        myfinance.bankInstitutionField().tab().type('{enter}')
        myfinance.balanceFieldCash().type(newValue).should('have.value', '1,000')
        cy.get('.MuiFormControl-root').click()
        cy.contains('Visa').click().type('tab').type('1234')
        cy.wait(250)
        myfinance.createButton().click()
        myfinance.creditAccountCreatedNotification().should('exist')
        myfinance.transactionCreatedNotification().should('exist')
    })
    it('Check the Net value C&B collectibles widget', function()
    {
        myfinance.cbNetValueWidget().then($valueState => {
        const previousNetValueCBWidget = $valueState.text() 
        myfinance.cbNetValueWidget().should('have.text', previousNetValueCBWidget) 
        const previousNetValueInt = previousNetValueCBWidget.substr(5)  
        const resultNetValueCBWidget = parseInt(previousNetValueInt.replace(",", "") ) + newValue 
        myfinance.cbNetValueWidget().should('have.text', currency + '(' + internationalNumberFormat.format(resultNetValueCBWidget) + ')' )   
    })
    })

    it('Create the Credit card account and check the Liability widget', function()
    {
        myfinance.myFinancePlusButton().click()
        cy.contains('Account').should('exist')
        myfinance.selectAccountDropDown().click()
        myfinance.selectCreditAccount().click()
        myfinance.nextButton().click()
        mainpage.modalTitle().should('have.text', 'Credit Card Account')
        myfinance.accountNameField().type('accountnametest')
        myfinance.bankInstitutionField().type("Zion")
        myfinance.ziaBankInstitution().should('exist')
        myfinance.bankInstitutionField().tab().type('{enter}')
        myfinance.balanceFieldCash().type(newValue).should('have.value', '1,000')
        cy.get('[aria-haspopup="listbox"]').click()
        cy.contains('Visa').click().type('tab').type('1234')
        
        cy.wait(250)
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
