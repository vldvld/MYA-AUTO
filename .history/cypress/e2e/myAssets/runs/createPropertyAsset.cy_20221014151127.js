import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import MainPage from '../../../pageObjects/mainPage'
import myFinance from '../../../pageObjects/myFinance'
import myProperty from '../../../pageObjects/myProperty'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

const login = new Login()
const signup = new Signup()
const mainpage = new MainPage()
const myfinance = new myFinance()
const myproperty = new myProperty()
const newValue = 1000
const currency = 'USD '
const internationalNumberFormat = new Intl.NumberFormat('en-US')

const name = () => Cypress._.random(0, 1e6)
const id = name()
const testName = "AUTOMATEDPROPERTY #" + `${id}`

describe('Creating and testing a property asset', function () {

  it('Go to the Property page and create the property', function () {
    cy.goToLoginPage()
    cy.loginCommand("automatedassets7@gmail.com", "testuser1")
    mainpage.homePageUrl()

    mainpage.goToMyProperty().click()
    cy.url().should('eq', `${Cypress.config().baseUrl}properties/summary`)

    myproperty.myPropertyPlusButton().click()
    cy.contains('Property').should('exist')
    myproperty.propertyName().click().type(testName).should('have.value', testName)

    myproperty.propertyType().click().type('{downarrow}').type('{enter}')
    myproperty.locationField().type('trinklera')
    cy.wait(1000)
    cy.get('[role="option"]', { timeout: 20000 }).contains(/Kharkiv/).trigger('click', { force: true })
    cy.wait(200)
    myproperty.purchasePrice().type(newValue)

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

    cy.wait(500) //I use this wait to prevent the 0 asset balance issue 

    myproperty.createButton().should('not.be.disabled').click()
    myproperty.propertyCreatedNotification().should('exist')
  })
  it('Check the Value widget', function () {
    cy.log('wrap result is ' + this.wrapvalue)
    const wrapvalueconst = Number(this.wrapvalue) + newValue
    cy.log(wrapvalueconst)
    mainpage.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))
  })

  it('Check the Net Value widget', function () {
    cy.log('wrap result is ' + this.wrapNetvalue)
    const wrapnetvaluetyconst = Number(this.wrapNetvalue) + newValue
    cy.log(wrapnetvaluetyconst)
    mainpage.cbNetValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapnetvaluetyconst))
  })
})


