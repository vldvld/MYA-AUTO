import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Creating Cash account', function () {
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

    it('Go to the MyFinance page and create the Cash account', function () {
        cy.goToLoginPage()
        cy.loginCommand("automationtests5@gmail.com", "testuser1")
        mainpage.homePageUrl()
cy.wait(2000)
        cy.createCashAccount()

        myfinance.cbValueWidget().then($valueState => {
            const previousValueCBWidget = $valueState.text()
            myfinance.cbValueWidget().should('have.text', previousValueCBWidget)
            const previousValueInt = previousValueCBWidget.substr(4)
            const resultValueCBWidget = parseInt(previousValueInt.replace(",", "")) + newValue
            myfinance.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(resultValueCBWidget, { timeout: 60000 }))
        })
    })
})
