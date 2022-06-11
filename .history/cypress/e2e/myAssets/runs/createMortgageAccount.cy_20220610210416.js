import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Creating and testing the Mortgage account', function () {
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const currency = 'USD '
    const newValue = 1000
    const internationalNumberFormat = new Intl.NumberFormat('en-US')

    const name = () => Cypress._.random(0, 1e6)
    const id = name()
    const testName = "AUTOMATEDMORTGAGE #" + `${id}`

    it('Go to the MyFinance page and create the Mortgage account', function () {
        cy.goToLoginPage()
        cy.loginCommand("automationtests5@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToMyFinance().click()
        myfinance.cashAndBankingTab().click()
        myfinance.myFinancePlusButton().click()
        cy.contains('Account').should('exist')
        myfinance.selectAccountDropDown().click()
        myfinance.selectMortgageAccount().click()
        myfinance.nextButton().click()
        mainpage.modalTitle().should('have.text', 'Mortgage Account')

        // wait for a full firebase API loading
        cy.contains('0 / 0.00%', { timeout: 50000 }).should('exist')

        myfinance.accountNameField().type(testName)
        myfinance.outstandingAmmount().type(newValue).should('have.value', '1,000')
        myfinance.bankInstitutionField().type("Zion")
        myfinance.ziaBankInstitution().should('exist')
        myfinance.bankInstitutionField().tab().type('{enter}')

        myfinance.createButton().should('not.be.disabled').click()
        myfinance.mortgageCreatedNotification().should('exist')
        myfinance.transactionCreatedNotification().should('exist')

    })
    it('Check the Net value C&B collectibles widgets', function () {
        myfinance.cbNetValueWidget().then($valueState => {
            const previousNetValueCBWidget = $valueState.text()
            myfinance.cbNetValueWidget().should('have.text', previousNetValueCBWidget)
            const previousNetValueInt = previousNetValueCBWidget.substr(5)
            const resultNetValueCBWidget = parseInt(previousNetValueInt.replace(",", "")) + newValue
            myfinance.cbNetValueWidget().should('have.text', currency + '(' + internationalNumberFormat.format(resultNetValueCBWidget) + ')')
        })

    })

})

