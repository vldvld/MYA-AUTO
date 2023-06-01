import MainPage from '../../../pageObjects/mainPage'
import myBelongings from '../../../pageObjects/myBelongings'
import myCollection from '../../../pageObjects/myCollection'

const mainpage = new MainPage()
const mybelongings = new myBelongings()
const mycollection = new myCollection()

const newValue = 1000
const currency = 'USD '
const internationalNumberFormat = new Intl.NumberFormat('en-US')

// Create a random Asset name
const name = () => Cypress._.random(0, 1e6)
const id = name()
const testName = "AUTOMATEDOTHERASSET #" + `${id}`

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Creating the My Belonging asset', function () {

  beforeEach(() => {
    cy.goToLoginPage()
    cy.loginCommand("mya-automated-tests@gmail.com", "mya-automated-tests@gmail.com")
    mainpage.homePageUrl()
  })

  it('Go to the My belongings page and create an other asset', function () {

    mainpage.goToMyBelongings().click()
    cy.url().should('eq', `${Cypress.config().baseUrl}others/summary`)
    mybelongings.myBelongingsPlusButton().click()

    mybelongings.nameField().type(testName).should('have.value', testName)
    cy.wait(500)

    mybelongings.belongingTypeFiled().click().type('a')
    cy.get('li').last().click()

    mybelongings.manufacturerField().type('manufacturer')
    cy.get('li').last().click()

    cy.get('#linkedPropertyAsLocation').click().type('AUT')
    mycollection.shouldExistPropertySearch().should('exist')

    cy.get('[role="dialog"]', { timeout: 20000 }).contains(/AUTOMATEDPROPERTY/, { timeout: 50000 }).trigger("click")
    mybelongings.priceField().type(newValue).should('have.value', '1,000')

    cy.wait(500) //I use this wait to prevent the 0 asset balance issue 

    mainpage.cbValueWidget().then($widgetvalue => {
      const widgetvaluetext = $widgetvalue.text().replace(currency, "");
      cy.log(widgetvaluetext)
      cy.wrap(widgetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapvalue')
    })

    mainpage.cbNetValueWidget().then($widgetnetvalue => {
      const widgetnetvaluetext = $widgetnetvalue.text().replace(currency, "")
      cy.log(widgetnetvaluetext)
      cy.wrap(widgetnetvaluetext.replace(/[^a-zA-Z0-9 ]/g, '')).as('wrapNetvalue')
    })

    mybelongings.saveAndClose().should('not.be.disabled').click()
    mybelongings.myBelongingsCreatedNotification().should('exist')
    cy.wait(500)
  })

  it('Check the value / netValue widget values', function () {

    mainpage.goToMyBelongings().click()
    mainpage.cbValueWidget().should('not.have.value', '0');
    //value
    cy.log('wrap result is ' + this.wrapvalue)
    const wrapvalueconst = Number(this.wrapvalue) + newValue
    cy.log(wrapvalueconst)
    mainpage.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))

    //netValue
    cy.log('wrap result is ' + this.wrapNetvalue)
    const wrapnetvaluetyconst = Number(this.wrapNetvalue) + newValue
    cy.log(wrapnetvaluetyconst)
    mainpage.cbNetValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapnetvaluetyconst))

  })
  it('Check a created asset on the art assets list by using the card view + using search field', function () {
    mainpage.goToMyBelongings().click()
    cy.url().should('eq', `${Cypress.config().baseUrl}others/summary`)

    cy.contains('Search MyBelongings').click()
    cy.url().should('include', '/others/collection')
    cy.contains('AUTOMATEDOTHERASSET', { timeout: 50000 })
    cy.get('[data-cy="header-action-panel-search-input"]').type('nonvalidassettest').type('{enter}')
    cy.contains('Sorry, no Assets were found matching your search')
    cy.get('.MuiInputAdornment-positionEnd > .MuiButtonBase-root').click()
    cy.get('[data-cy="header-action-panel-search-input"]').type(testName).type('{enter}')
    cy.contains('1-1 of 1').should('exist')
    cy.contains('USD 1,000').click()
    cy.url().should('include', '/detail')
    cy.contains(testName).should('exist')
    cy.contains('manufacturer').should('exist')
    cy.contains('AUTOMATEDPROPERTY #').should('exist')

  })

  it('Check the art search feature by using table view screen', function () {
    mainpage.goToMyBelongings().click()
    cy.url().should('eq', `${Cypress.config().baseUrl}others/summary`)

    cy.contains('Search MyBelongings').click()
    cy.get('[data-cy="layout-toggler-table"] > .MuiIconButton-label > .MuiSvgIcon-root').click()
    cy.url().should('include', '/others/collection')
    cy.contains('AUTOMATEDOTHERASSET')
    cy.get('[data-cy="header-action-panel-search-input"]').type('nonvalidassettest').type('{enter}')
    cy.contains('Sorry, no Assets were found matching your search')
    cy.get('.MuiInputAdornment-positionEnd > .MuiButtonBase-root').click()
    cy.get('[data-cy="header-action-panel-search-input"]').type(testName).type('{enter}')
    cy.contains('1-1 of 1').should('exist')
    cy.contains('USD 1,000').should('exist')
    cy.get('.MuiGrid-root > .MuiTypography-root').click()
    cy.url().should('include', '/detail')
    cy.contains(testName).should('exist')
    cy.contains('manufacturer').should('exist')
    cy.contains('AUTOMATEDPROPERTY #').should('exist')    
    cy.url().should('include', '/detail')
    cy.contains(testName).should('exist')
    cy.contains('manufacturer').should('exist')
    cy.contains('AUTOMATEDPROPERTY #').should('exist')

  })

  // it('Make sure that a created asset is shown on the asstest list', function () {
  //   cy.get('[href="/others/collection"]').click()
  //   cy.contains(testName).should('exist')
  // })
})

