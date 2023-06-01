
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Creating Cash account', function () {
  beforeEach(() => {
    cy.goToLoginPage()
    cy.loginCommand("mya-automated-tests@gmail.com", "mya-automated-tests@gmail.com")
    mainpage.homePageUrl()
    mainpage.goToMyFinance().click()
    myfinance.insuranceTab().click()
  })

  const mainpage = new MainPage()
  const myfinance = new myFinance()
  const currency = 'USD '
  const newValue = 1000
  const internationalNumberFormat = new Intl.NumberFormat('en-US')

  const name = () => Cypress._.random(0, 1e6)
  const id = name()
  const testName = "ATUOMATEDINSURANCE #" + `${id}`

  it('Go to the Insurance page and create the Cash account', function () {
    myfinance.myFinancePlusButton().click()
    cy.contains('Select an Insurance Type').should('exist')
    cy.contains('Select type').click()
    cy.get('[data-value="INSURANCE_LIFE"]').click()
    cy.contains('Next').click()

    myfinance.insuranceCreate().should('be.disabled')
    myfinance.insuranceCompany()
    myfinance.insurancePolicyName()
    myfinance.insuranceCoverageAmount()
    myfinance.insuranceCreate().should('be.disabled')
   // mainpage.personalRefNo().should('not.be.empty')
   cy.get('#personalRefNo').should('not.to.match', ':empty')
    // myfinance.selectAccountDropDown().click()
    // myfinance.selectCashAccont().click()
    // myfinance.nextButton().click()
    // mainpage.modalTitle().should('have.text', 'Cash')

    // cy.contains('Last Updated', { timeout: 30000 })

    // myfinance.balanceFieldCash().type(newValue).should('have.value', '1,000')
    // myfinance.accountNameField().clear()
myfinance.accountNameField().type(testName)

    // myfinance.createButton().should('not.be.disabled').click()

    // myfinance.cashAccountCreatedNotification().should('exist')
    // myfinance.transactionCreatedNotification().should('exist')
  })


  // it('Make sure that created asset is shown on the list of created assets', function () {
  //   cy.contains(testName).should('exist')
  // })
})

