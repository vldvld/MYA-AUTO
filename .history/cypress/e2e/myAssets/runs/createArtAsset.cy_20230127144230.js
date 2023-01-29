import MainPage from '../../../pageObjects/mainPage'
import myCollection from '../../../pageObjects/myCollection'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

const mainpage = new MainPage()
const mycollection = new myCollection()

const newValue = 1000
const currency = 'USD '
const internationalNumberFormat = new Intl.NumberFormat('en-US')

// Create a random Asset name
const name = () => Cypress._.random(0, 1e6)
const id = name()
const testName = "AUTOMATEDART #" + `${id}`

describe('Creating an Art asset', function () {

  beforeEach(() => {
    cy.goToLoginPage()
    cy.loginCommand("mya-automated-tests@gmail.com", "mya-automated-tests@gmail.com")
    mainpage.homePageUrl()
    mainpage.goToMyCollection().click()
    mycollection.artTab().click()
  })

  it('Go to the My collectibles page and create an art asset', function () {
    mycollection.artTab().click()
    mycollection.myCollectionPlusButton().click()

    mycollection.artistField().type('Bob Evans').should('have.value', 'Bob Evans')
    cy.get('[role="menuitem"]', { timeout: 20000 }).contains('Bob Evans').trigger("click")

    mycollection.titleField().type(testName).should('have.value', testName)

    mycollection.artTypeField().click()
    cy.get('#artType-option-1').click()

    mycollection.purcasePriceArt().type('1000').should('have.value', '1,000')

    cy.get('#linkedPropertyAsLocation').click().type('AUT')
    mycollection.shouldExistPropertySearch().should('exist')
    cy.get('li').last().click()

    cy.wait(500) //I use this wait to prevent the 0 asset balance issue 
    // cy.contains('Number of artists', { timeout: 50000 }).should('exist')

    mycollection.artSummarylValue().should('not.have.value', '0');
    mycollection.artSummarylValue().then($widgetvalue => {
      const widgetvaluetext = $widgetvalue.text().replace(currency, "");
      cy.log(widgetvaluetext)
      cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapvalue')
    })

    mycollection.artSummaryLiability().then($widgetliability => {
      const widgetliabilitytext = $widgetliability.text().replace(currency, "")
      cy.log(widgetliabilitytext)
      cy.wrap(widgetliabilitytext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapliability')
    })

    mycollection.artSummaryNetValue().then($widgetnetvalue => {
      const widgetnetvaluetext = $widgetnetvalue.text().replace(currency, "")
      cy.log(widgetnetvaluetext)
      cy.wrap(widgetnetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapnetvalue')
    })

    mycollection.createButton().should('not.be.disabled').click()
    mycollection.artCreatedNotification().should('exist')

    cy.wait(1000)
  })

  it('Check the value / liability / netValue widget values', function () {
    
    mycollection.artSummarylValue().should('not.have.value', '0');
    //value widget
    cy.log('wrap result is ' + this.wrapvalue)
    const wrapvalueconst = Number(this.wrapvalue) + newValue
    cy.log(wrapvalueconst)
    mainpage.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))
    //liability widget
    cy.log('wrap result is ' + this.wrapliability)
    const wrapliabilityconst = Number(this.wrapliability)
    cy.log(wrapliabilityconst)
    mainpage.cbLiabilityWidget().should('have.text', currency + internationalNumberFormat.format(wrapliabilityconst))
    //netValue widget
    cy.log('wrap result is ' + this.wrapnetvalue)
    const wrapnetvaluetyconst = Number(this.wrapnetvalue) + newValue
    cy.log(wrapnetvaluetyconst)
    mainpage.cbNetValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapnetvaluetyconst))
  })

  it('Check the Activity log widget, make sure that created asset note was added', function () {
    cy.contains('You added ' + testName + ' for USD 1,000', { timeout: 20000 })
  })

  it('Check a created asset on the art assets list by using the card view by using search field', function () {
    cy.get('[data-cy=art-search-tab-btn]').click()
    cy.url().should('include', '/art/collection')
    cy.contains('AUTOMATEDART')
    cy.get('[data-cy="header-action-panel-search-input"]').type('nonvalidassettest').type('{enter}')
    cy.contains('Sorry, no Assets were found matching your search')
    cy.get('.MuiInputAdornment-positionEnd > .MuiButtonBase-root').click()
    cy.get('[data-cy="header-action-panel-search-input"]').type(testName).type('{enter}')
   // cy.wait(700)
   cy.get('.MuiToolbar-root > :nth-child(4)').should('eq', '1-1 of 1')

    cy.contains('USD 1,000').click()
    cy.url().should('include', '/detail')
    cy.contains(testName).should('exist')
    cy.contains('Bob Evans').should('exist')
    cy.contains('Calligraphy').should('exist')
    cy.contains('AUTOMATEDPROPERTY #').should('exist')
    cy.contains('You located art at AUTOMATEDPROPERTY').should('exist')
    cy.contains('You added AUTOMATEDART #').should('exist', { timeout: 20000 })
  })

  it('Check the art search feature by using table view screen', function () {

    cy.contains('Add from wine catalogue').click()
    cy.get('[data-cy="header-action-panel-search-input"]').type('testwinesearchnamenonvalid').type('{enter}')
    cy.contains('No Wine displayed.').should('exist', { timeout: 20000 })
    cy.get('.MuiInputAdornment-positionEnd > .MuiButtonBase-root').click()
    cy.get('[data-cy="header-action-panel-search-input"]').type('1723 Vineyards Chardonel').type('{enter}')
    cy.get('.MuiInputAdornment-positionEnd > .MuiButtonBase-root').click()
    cy.contains('1723 Vineyards', { timeout: 20000 }).should('exist')
  })
})
