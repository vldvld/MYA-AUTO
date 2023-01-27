import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'
import myCollection from '../../../pageObjects/myCollection'

const mainpage = new MainPage()
const myfinance = new myFinance()
const mycollection = new myCollection()

const currency = 'USD '
const newValue = 1000
const internationalNumberFormat = new Intl.NumberFormat('en-US')

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Go to the cryptocurrency dashboard page and create a new crypto account', function () {

  it('Collect a values from the collectables widgets', function () {
    cy.goToLoginPage()
    cy.loginCommand("automatedtests@gmai.com", "automatedtests@gmai.com")
    mainpage.homePageUrl()

    mainpage.goToMyFinance().click()
    cy.contains('Cryptocurrencies').click()
    mycollection.myCollectionPlusButton().click()
    myfinance.cryptoInstitutionField().type('bitstam')
    cy.get('li').first().click()

    cy.contains('Coin/Cash').click()
    cy.contains('Coin name/Code').should('exist')
    myfinance.cryptoHoldingField().type('usdt')
    cy.wait(300)
    cy.contains('USDT-USD').should('exist').click()
    myfinance.cryptoHoldingField().should('have.value', 'Tether')
    myfinance.cryptoHoldingField().tab().type('1000')
    cy.get('#pricePerUnit').should('be.disabled')

    myfinance.cbValueWidget().then($widgetvalue => {
      const widgetvaluetext = $widgetvalue.text().replace(currency, "");
      cy.log(widgetvaluetext)
      cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapvalue')
    })

    myfinance.cbNetValueWidget().then($widgetnetvalue => {
      const widgetnetvaluetext = $widgetnetvalue.text().replace(currency, "")
      cy.log(widgetnetvaluetext)
      cy.wrap(widgetnetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapnetvalue')
    })

    cy.wait(500)
    cy.get('[data-cy="asset-dialog-submit-btn"]').should('be.enabled').click()
    cy.contains('Crypto Account was created',{ timeout: 30000 })
})
it('Check the Value widget', function () {
  cy.log('wrap result is ' + this.wrapvalue)
  const wrapvalueconst = Number(this.wrapvalue) + newValue
  cy.log(wrapvalueconst)
  myfinance.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))

})

it('Check the Net Value widget', function () {
  cy.log('wrap result is ' + this.wrapnetvalue)
  const wrapnetvaluetyconst = Number(this.wrapnetvalue) + newValue
  cy.log(wrapnetvaluetyconst)
  myfinance.cbNetValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapnetvaluetyconst))

})
})  