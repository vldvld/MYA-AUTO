import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Creating and testing a current account', function () {
  const mainpage = new MainPage()
  const myfinance = new myFinance()
  const currency = 'USD '
  const newValue = 1000
  const internationalNumberFormat = new Intl.NumberFormat('en-US')

  const name = () => Cypress._.random(0, 1e6)
  const id = name()
  const testName = "AUTOMATEDCURRENT #" + `${id}`


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

  it('Go to the MyFinance page and create a Saving account', function () {
    cy.goToLoginPage()
    cy.loginCommand("automationtests3@gmail.com", "testuser1")
    mainpage.homePageUrl()

    mainpage.goToMyFinance().click()
    myfinance.cashAndBankingTab().click()
    myfinance.myFinancePlusButton().click()
    cy.contains('Account').should('exist')
    myfinance.selectAccountDropDown().click()
    myfinance.selectCurrentAccount().click()
    myfinance.nextButton().click()
    mainpage.modalTitle().should('have.text', 'Current Account')
    cy.contains('Single-Currency Account').should('exist')
    myfinance.accountNameField().type('accountnametest')
    myfinance.bankInstitutionField().type("Zion")
    myfinance.ziaBankInstitution().should('exist')
    myfinance.bankInstitutionField().tab().type('{enter}')
    myfinance.balanceField().type(newValue).should('have.value', '1,000')

    cy.wait(500) //I use this wait to prevent the 0 asset balance issue 

    myfinance.createButton().should('not.be.disabled').click()
    myfinance.currentAccountCreatedNotification().should('exist')
    myfinance.transactionCreatedNotification().should('exist')
  })
  it('Check the C&B Collectibles widgets', function () {
    myfinance.cbValueWidget().then($valueState => {
      const previousValueCBWidget = $valueState.text()
      myfinance.cbValueWidget().should('have.text', previousValueCBWidget)
      const previousValueInt = previousValueCBWidget.substr(4)
      const resultValueCBWidget = parseInt(previousValueInt.replace(",", "")) + newValue
      myfinance.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(resultValueCBWidget))
    })
  })
})