import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

const mainpage = new MainPage()
const myfinance = new myFinance()
const currency = 'USD '
const newValue = 1000
const internationalNumberFormat = new Intl.NumberFormat('en-US')

const name = () => Cypress._.random(0, 1e6)
const id = name()
const testName = "AUTOMATEDSAVING #" + `${id}`

describe('Creating and testing a saving account', function () {
  beforeEach(() => {
    cy.goToLoginPage()
    cy.loginCommand("mya-automated-tests@gmail.com", "mya-automated-tests@gmail.com")
    mainpage.homePageUrl()
  })
  it('Go to the MyFinance page and create the Saving account', function () {

    mainpage.goToMyFinance().click()
    myfinance.cashAndBankingTab().click()
    myfinance.myFinancePlusButton().click()
    cy.contains('Account').should('exist')
    myfinance.selectAccountDropDown().click()
    myfinance.selectSavingAccount().click()
    myfinance.nextButton().click()
    mainpage.modalTitle().should('have.text', 'Saving Account')
    cy.contains('Single-Currency Account').should('exist')

    // wait for a full firebase API loading

    myfinance.accountNameField().clear()
    myfinance.accountNameField().type(testName)
    myfinance.bankInstitutionField().type("Afghanistan Commercial Bank")
    myfinance.ziaBankInstitution().should('exist')
    myfinance.bankInstitutionField().tab().type('{enter}')
    myfinance.balanceField().type(newValue).should('have.value', '1,000')

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
    cy.wait(500)
    myfinance.createButton().should('not.be.disabled').click()
    
    myfinance.savingAccountCreatedNotification().should('exist')
    myfinance.transactionCreatedNotification().should('exist')
  })

  it('Check the value / liability / netValue widget values', function () {

    mainpage.goToMyFinance().click()
    myfinance.cashAndBankingTab().click()
    myfinance.cbValueWidget().should('not.have.value', '0');

    //value
    cy.log('wrap result is ' + this.wrapvalue)
    const wrapvalueconst = Number(this.wrapvalue) + newValue
    cy.log(wrapvalueconst)
    myfinance.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))

    //liability
    cy.log('wrap result is ' + this.wrapliability)
    const wrapliabilityconst = Number(this.wrapliability)
    cy.log(wrapliabilityconst)
    myfinance.cbLiabilityWidget().should('have.text', currency + '(' + internationalNumberFormat.format(wrapliabilityconst) + ')')

    //netValue
    cy.log('wrap result is ' + this.wrapnetvalue)
    const wrapnetvaluetyconst = Number(this.wrapnetvalue) - newValue
    cy.log(wrapnetvaluetyconst)
    myfinance.cbNetValueWidget().should('have.text', currency + '(' + internationalNumberFormat.format(wrapnetvaluetyconst) + ')')
  })

  // it('Make sure that created asset is shown on the list of existed assets', function () {
  //   cy.contains(testName).should('exist')
  // })
})