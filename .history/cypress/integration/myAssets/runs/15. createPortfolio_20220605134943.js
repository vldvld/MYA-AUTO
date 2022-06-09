import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Creating a Portfolio account', function () {
    const mainpage = new MainPage()
    const myfinance = new myFinance()
    const currency = 'USD '
    const newValue = 1000
    const internationalNumberFormat = new Intl.NumberFormat('en-US')

    // Create a random Portfolio name
    const name = () => Cypress._.random(0, 1e6)
    const id = name()
    const testName = "AutoPortfolio #" + `${id}`

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

    it('Go to the Traditional page and create the portfolio', function () {
        cy.goToLoginPage()
        cy.loginCommand("automationtests3@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToMyFinance().click()
        myfinance.TITab().click()
        myfinance.myFinancePlusButton().click()

        myfinance.TIName().type(testName).should('have.value', testName)
        myfinance.TIInvestmentsAmountField().type(newValue).should('have.value', '1,000')
        
        cy.wait(3000)

        myfinance.TIAddHoldingButton().click()
        myfinance.TIHoldingName().type('bitcoin')

        cy.contains(/Bitcoin/)
        cy.get('li').last().click()

        myfinance.TIUnits().type(1)
        cy.wait(1000)
        myfinance.createButton().click()

        myfinance.portfolioWasCreatedNotification().should('exist')
        cy.contains(testName).should('exist')
        cy.contains("TestAutoProduct "+`${id}`).should('exist')
        cy.contains("TestAutoCompany "+`${id}`).should('exist')
        
        // myfinance.TIPortfolioType().click()
        // cy.get('#portfolioType-option-0').click()
        // myfinance.TICompany().type('TestAutoCompany '+`${id}`)
        // cy.contains('Add company: TestAutoCompany '+`${id}`, { timeout: 5000 }).click()
        // myfinance.TICompany().should('have.value', 'TestAutoCompany '+`${id}`)
        // myfinance.TIProduct().type('TestAutoProduct '+`${id}`)
        // cy.contains('Add product: TestAutoProduct '+`${id}`, { timeout: 5000 }).click()
        // myfinance.TIProduct().should('have.value', 'TestAutoProduct '+`${id}`)
        // myfinance.TISaveAndCloseButton().click()
    })
    // it('Check the created Portfolio notifications and created data', function()
    // {  
    //     myfinance.portfolioWasCreatedNotification().should('exist')
    //     cy.contains(testName).should('exist')
    //     cy.contains("TestAutoProduct "+`${id}`).should('exist')
    //     cy.contains("TestAutoCompany "+`${id}`).should('exist')
    //     myfinance.transactionCreatedNotification().should('exist')
    // })
})



