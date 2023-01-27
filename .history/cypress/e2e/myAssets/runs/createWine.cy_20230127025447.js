import Mainpage from '../../../pageObjects/mainPage'
import Mycollection from '../../../pageObjects/myCollection'

const mainpage = new Mainpage()
const mycollection = new Mycollection()
const vintage = '1999'
const price = 1000
const currency = 'USD '
const internationalNumberFormat = new Intl.NumberFormat('en-US')

const name = () => Cypress._.random(0, 1e6)
const id = name()
const testName = "AUTOMATEDWINE #" + `${id}`

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Wine page tests', function () {

  beforeEach(() => {
    cy.goToLoginPage()
    cy.loginCommand("mya-automated-tests@gmail.com", "mya-automated-tests@gmail.com")
    mainpage.homePageUrl()
    mainpage.goToMyCollection({ timeout: 20000 }).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}collections/all-assets/dashboard`)
    mycollection.wineTab().click()
    cy.url().should('eq', `${Cypress.config().baseUrl}collections/wine/summary`)
  })

  it('Go to the My wine page and add a new wine manually', function () {

    mycollection.myCollectionPlusButton().click()
    mycollection.createNewWine().click()
    cy.contains('Wine').should('exist')

    mycollection.wineProducer().type('autotestWineProducer').should('have.value', 'autotestWineProducer')
    cy.get('[role="menuitem"]', { timeout: 20000 }).contains(/autotestWineProducer/).trigger("click")
    mycollection.wineName().type(testName).should('have.value', testName)
    mycollection.wineVintage().type(vintage).should('have.value', vintage)
    mycollection.pricePerBottle().type(price).should('have.value', '1,000')
    // cy.contains('You added', { timeout: 20000 })

    mycollection.winePropertyLocation().type('automatedproperty')
    mycollection.shouldExistPropertySearch().should('exist')
    
    cy.get('[role="dialog"]', { timeout: 20000 }).contains(/AUTOMATEDPROPERTY/, { timeout: 50000 }).trigger("click")

    cy.wait(500) //I use this wait to prevent the 0 asset balance issue 

    mainpage.cbValueWidget().should('not.have.value', '0');
    mainpage.cbValueWidget().then($widgetvalue => {
      const widgetvaluetext = $widgetvalue.text().replace(currency, "");
      cy.log(widgetvaluetext)
      cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapvalue')
    })

    mainpage.cbLiabilityWidget().then($widgetliability => {
      const widgetliabilitytext = $widgetliability.text().replace(currency, "")
      cy.log(widgetliabilitytext)
      cy.wrap(widgetliabilitytext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapliability')
    })

    mainpage.cbNetValueWidget().then($widgetnetvalue => {
      const widgetnetvaluetext = $widgetnetvalue.text().replace(currency, "")
      cy.log(widgetnetvaluetext)
      cy.wrap(widgetnetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapnetvalue')
    })

    mycollection.createButton().should('not.be.disabled').click()
    mycollection.wineCreatedNotification().should('exist')
    cy.wait(500)
  })

  it('Check the Wine value widget', function () {

    mainpage.cbValueWidget().should('not.have.value', '0');

    //value
    cy.log('wrap result is ' + this.wrapvalue)
    const wrapvalueconst = Number(this.wrapvalue) + price
    cy.log(wrapvalueconst)
    mainpage.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))

    //liability
    cy.log('wrap result is ' + this.wrapliability)
    const wrapliabilityconst = Number(this.wrapliability)
    cy.log(wrapliabilityconst)
    mainpage.cbLiabilityWidget().should('have.text', currency + internationalNumberFormat.format(wrapliabilityconst))

    //netValue
    cy.log('wrap result is ' + this.wrapnetvalue)
    const wrapnetvaluetyconst = Number(this.wrapnetvalue) + price
    cy.log(wrapnetvaluetyconst)
    mainpage.cbNetValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapnetvaluetyconst))
  })

  // it('Check the values of created asset on the activity log widget', function () {
  //   cy.contains('You located 1 bottles of ' + vintage + ' ' + testName + ' at', { timeout: 20000 }).should('exist')
  //   cy.contains('You bought 1 bottles of ' + vintage + ' ' + testName + ' for USD 1,000', { timeout: 20000 }).should('exist')
  // })

  it('Check the wine catalogue', function () {
  
    mycollection.myCollectionPlusButton().click()
    cy.wait(3000)
    cy.contains('Add from wine catalogue').click()
    cy.get('[data-cy="header-action-panel-search-input"]').type('testwinesearchnamenonvalid').type('{enter}')
    cy.contains('No Wine displayed.').should('exist', { timeout: 20000 })
    cy.get('[data-cy="header-action-panel-search-input"]').clear().type('1723 Vineyards Chardonel').type('{enter}')
    cy.get('[data-cy="header-action-panel-search-input"]').clear()
    cy.contains('1723 Vineyards', { timeout: 20000 }).should('exist')

  })
})


