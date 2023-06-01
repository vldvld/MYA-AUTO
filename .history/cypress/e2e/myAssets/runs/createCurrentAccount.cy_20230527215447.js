import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'

const mainpage = new MainPage()
  const myfinance = new myFinance()
  const currency = 'USD '
  const newValue = 1000
  const internationalNumberFormat = new Intl.NumberFormat('en-US')

  const name = () => Cypress._.random(0, 1e6)
  const id = name()
  const testName = "AUTOMATEDCURRENT #" + `${id}`

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Creating and testing a current account', function () {

  beforeEach(() => {
    cy.goToLoginPage()
    cy.loginCommand("mya-automated-tests@gmail.com", "mya-automated-tests@gmail.com")
    mainpage.homePageUrl()
  })
  
  it('Go to the MyFinance page and create a Saving account', function () {
    mainpage.goToMyFinance().click()
    myfinance.cashAndBankingTab().click()
    myfinance.myFinancePlusButton().click()
    cy.contains('Account').should('exist')
    myfinance.selectAccountDropDown().click()
    myfinance.selectCurrentAccount().click()
    myfinance.nextButton().click()
    mainpage.modalTitle().should('have.text', 'Current Account')

    // wait for a full firebase API loading
  
    cy.contains('Single-Currency Account').should('exist')
    myfinance.balanceField().type(newValue).should('have.value', '1,000')
    myfinance.accountNameField().clear()
    myfinance.accountNameField().type(testName)
    myfinance.bankInstitutionField().type("Afghan u")
    myfinance.ziaBankInstitution().should('exist') 
    cy.get(".MuiList-root").contains(/Afghan United Bank/, { timeout: 50000 }).trigger("click")
    cy.contains('Last Updated', { timeout: 30000 })

    //value
    myfinance.cbValueWidget().then($widgetvalue => {
      const widgetvaluetext = $widgetvalue.text().replace(currency, "");
      cy.log(widgetvaluetext)
      cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapvalue')
    })
    //liability
    myfinance.cbLiabilityWidget().then($widgetliability => {
      const widgetliabilitytext = $widgetliability.text().replace(currency, "")
      cy.log(widgetliabilitytext)
      cy.wrap(widgetliabilitytext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapliability')
    })
    //netValue
    myfinance.cbNetValueWidget().then($widgetnetvalue => {
      const widgetnetvaluetext = $widgetnetvalue.text().replace(currency, "")
      cy.log(widgetnetvaluetext)
      cy.wrap(widgetnetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapnetvalue')
    })
    myfinance.createButton().should('not.be.disabled').click()
    
    myfinance.currentAccountCreatedNotification().should('exist')
    myfinance.transactionCreatedNotification().should('exist')
   
   
  })

  it('Check the value / liability / netValue widget values', function () {

    mainpage.goToMyFinance().click()
    myfinance.cashAndBankingTab().click()
    cy.url().should('eq', `${Cypress.config().baseUrl}finances/accounts`)
    myfinance.cbValueWidget().should('not.have.value','0');
    
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

  // it('Make sure that created asset is shown on the list of created assets', function () {
  //   cy.contains(testName).should('exist')
  // })
})