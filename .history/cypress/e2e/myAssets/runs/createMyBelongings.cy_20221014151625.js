import MainPage from '../../../pageObjects/mainPage'
import myBelongings from '../../../pageObjects/myBelongings'
import myCollection from '../../../pageObjects/myCollection'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Creating an Other asset', function () 
{
  const mainpage = new MainPage()
  const mybelongings = new myBelongings()
  const mycollection = new myCollection()

  const newValue = 1000
  const currency = 'USD '
  const internationalNumberFormat = new Intl.NumberFormat('en-US')

  // Create a random Asset name
  const name = () => Cypress._.random(0, 1e6)
  const id = name()
  const testName = "AUTOMATEDOTHERASSET #" +`${id}`
  
  it('Go to the My belongings page and create an other asset', function()
  {
    cy.goToLoginPage()
    cy.loginCommand("automatedassets6@gmail.com", "testuser1")
    mainpage.homePageUrl()

    mainpage.goToMyBelongings().click()
    cy.url().should('eq', `${Cypress.config().baseUrl}others/summary`)
    mybelongings.myBelongingsPlusButton().click()

    mybelongings.nameField().type(testName).should('have.value', testName)
    cy.wait(500)
    
    mybelongings.belongingTypeFiled().click()
    cy.wait(500)
    cy.get('li').last().click()

    mybelongings.manufacturerField().type('manufacturer')
    cy.get('li').last().click()

    cy.get('#linkedPropertyAsLocation').click()
    cy.wait(1500)
    mycollection.shouldExistPropertySearch().should('exist')
    cy.get('li').last().click()

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
  })  
  it('Check the value widget', function () {
    cy.log('wrap result is ' + this.wrapvalue)
    const wrapvalueconst = Number(this.wrapvalue) + newValue
    cy.log(wrapvalueconst)
    mainpage.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))
  })

  it('Check the Net value widget', function () {
    cy.log('wrap result is ' + this.wrapNetvalue)
    const wrapnetvaluetyconst = Number(this.wrapNetvalue) + newValue
    cy.log(wrapnetvaluetyconst)
    mainpage.cbNetValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapnetvaluetyconst))
  })

  it('Make sure that a created asset is shown on the asstest list', function () {
    cy.get('[href="/others/collection"]').click()
    cy.contains(testName).should('exist')
  })
})

