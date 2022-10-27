import MainPage from '../../../pageObjects/mainPage'
import myCollection from '../../../pageObjects/myCollection'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Creating an other collectables asset', function () {
  const mainpage = new MainPage()
  const mycollection = new myCollection()

  const newValue = 1000
  const currency = 'USD '
  const internationalNumberFormat = new Intl.NumberFormat('en-US')

  // Create a random Asset name
  const name = () => Cypress._.random(0, 1e6)
  const id = name()
  const testName = "AUTOMATEDART #" + `${id}`

  it('Go to the My collectibles page and create an other collectables asset', function () {
    cy.goToLoginPage()
    cy.loginCommand("automationtests7@gmail.com", "automationtests7@gmail.com")
    mainpage.homePageUrl()

    mainpage.goToMyCollection({ timeout: 20000 }).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}collections/all-assets/dashboard`)

    mycollection.otherCollectablesTab().click()
    mycollection.myCollectionPlusButton().click()

    mycollection.collectionTypeField().click()
    cy.wait(800)
    cy.get('li').last().click()
    mycollection.collectionTypeField()

    mycollection.manufactureField().type('Test Brand')
    cy.get('li').last().click()
    mycollection.manufactureField().should('have.value', 'Test Brand')

    mycollection.modelTypeField().type('Test Model Type')
    cy.get('li').last().click()
    mycollection.modelTypeField().should('have.value', 'Test Model Type')

    cy.get('#linkedPropertyAsLocation').click()
    mycollection.shouldExistPropertySearch().should('exist')
    cy.get('li').last().click()

    mycollection.purcasePriceArt().type('1000').should('have.value', '1,000')

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
    
    cy.contains('Save and Close').should('not.be.disabled').click()
    mycollection.OtherCollectablesAssetCreatedNotification().should('exist')
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
})

