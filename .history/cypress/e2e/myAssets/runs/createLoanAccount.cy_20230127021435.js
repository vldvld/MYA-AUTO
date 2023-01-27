import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

const mainpage = new MainPage()
const myfinance = new myFinance()
const currency = 'USD '
const newValue = 1000
const internationalNumberFormat = new Intl.NumberFormat('en-US')

const name = () => Cypress._.random(0, 1e6)
const id = name()
const testName = "AUTOMATEDLOAN #" + `${id}`

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Create the Loan account and check the C&B widgets', { testIsolation: false }, function () {

  beforeEach(() => {
    cy.goToLoginPage()
    cy.loginCommand("mya-automated-tests@gmail.com", "mya-automated-tests@gmail.com")
    mainpage.homePageUrl()
  })

  it('Go to the MyFinance page and create the loan account', function () {

    mainpage.goToMyFinance().click()
    myfinance.cashAndBankingTab().click()
    myfinance.myFinancePlusButton().click()
    cy.contains('Account').should('exist')
    myfinance.selectAccountDropDown().click()
    myfinance.selectLoanAccount().click()
    myfinance.nextButton().click()
    mainpage.modalTitle().should('have.text', 'Loan Account')
    // wait for a full firebase API loading


    myfinance.outstandingAmmount().type(newValue).should('have.value', '1,000')

    myfinance.accountNameField().type(testName).should('have.value', testName)
    myfinance.bankInstitutionField().type("Afghanistan Commercial Bank")
    myfinance.ziaBankInstitution().should('exist')
    myfinance.bankInstitutionField().tab().type('{enter}')

    cy.contains('Last Updated', { timeout: 30000 })
    
    myfinance.cbValueWidget().should('not.have.value', '0');
    myfinance.cbValueWidget().then($widgetvalue => {
      const widgetvaluetext = $widgetvalue.text().replace(currency, "");
      cy.log(widgetvaluetext)
      cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapvalue')
    })

    myfinance.cbLiabilityWidget().then($widgetliability => {
      const widgetliabilitytext = $widgetliability.text().replace(currency, "")
      cy.log(widgetliabilitytext)
      cy.wrap(widgetliabilitytext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapliability')
    })

    myfinance.cbNetValueWidget().then($widgetnetvalue => {
      const widgetnetvaluetext = $widgetnetvalue.text().replace(currency, "")
      cy.log(widgetnetvaluetext)
      cy.wrap(widgetnetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapnetvalue')
    })

    myfinance.createButton().should('not.be.disabled').click()
    myfinance.loanAccountCreatedNotification().should('exist')
    myfinance.transactionCreatedNotification().should('exist')
  })

  it('Check the value / liability / netValue widget values', function () {

    mainpage.goToMyFinance().click()
    myfinance.cashAndBankingTab().click()

    //value
    myfinance.cbValueWidget().should('not.have.value', '0');
    cy.log('wrap result is ' + this.wrapvalue)
    const wrapvalueconst = Number(this.wrapvalue)
    cy.log(wrapvalueconst)
    myfinance.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))

    //liability
    cy.log('wrap result is ' + this.wrapliability)
    const wrapliabilityconst = Number(this.wrapliability) + newValue
    cy.log(wrapliabilityconst)
    myfinance.cbLiabilityWidget().should('have.text', currency + '(' + internationalNumberFormat.format(wrapliabilityconst) + ')')

    //netValue
    cy.log('wrap result is ' + this.wrapnetvalue)
    const wrapnetvaluetyconst = Number(this.wrapnetvalue) + newValue
    cy.log(wrapnetvaluetyconst)
    myfinance.cbNetValueWidget().should('have.text', currency + '(' + internationalNumberFormat.format(wrapnetvaluetyconst) + ')')

  })
})



