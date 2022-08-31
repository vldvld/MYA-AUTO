import MainPage from '../../../pageObjects/mainPage'
import myCollection from '../../../pageObjects/myCollection'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

function nFormatter(num) {
  if (num >= 1000000000) {
     return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if (num >= 1000000) {
     return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
     return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}
describe('Creating an Art asset', function () {
  const mainpage = new MainPage()
  const mycollection = new myCollection()

  const newValue = 1000
  const currency = 'USD '
  const internationalNumberFormat = new Intl.NumberFormat('en-US')

  // Create a random Asset name
  const name = () => Cypress._.random(0, 1e6)
  const id = name()
  const testName = "AUTOMATEDART #" + `${id}`

  it('Go to the My collectibles page and create an art asset', function () {
    cy.goToLoginPage()
    cy.loginCommand("automationtests5@gmail.com", "testuser1")
    mainpage.homePageUrl()

    mainpage.goToMyCollection({ timeout: 20000 }).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}collections/all-assets/dashboard`)
    cy.wait(500)
    mycollection.myCollectionPlusButton().click()

    mycollection.artistField().type('Bob Evans').should('have.value', 'Bob Evans')
    cy.get('[role="menuitem"]', { timeout: 20000 }).contains('Bob Evans').trigger("click")

    mycollection.titleField().type(testName).should('have.value', testName)

    mycollection.artTypeField().click()
    cy.get('#artType-option-1').click()

    mycollection.purcasePriceArt().type('1000').should('have.value', '1,000')

    cy.get('#linkedPropertyAsLocation').click()
    mycollection.shouldExistPropertySearch().should('exist')
    cy.get('li').last().click()

    cy.wait(500) //I use this wait to prevent the 0 asset balance issue 
    cy.contains('Number of artists', { timeout: 50000 }).should('exist')

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

    mycollection.artCarouselValue().then($widgetvalue => {
      const widgetvaluetext = $widgetvalue.text().replace(currency, "");
      cy.log(widgetvaluetext)
      cy.wrap(widgetvaluetext.replace('K', '')).as('wrapArtValue')
    })
    mycollection.artCarouselLiability().then($widgetvalue => {
      const widgetvaluetext = $widgetvalue.text().replace(currency, "");
      cy.log(widgetvaluetext)
      cy.wrap(widgetvaluetext.replace('K', '')).as('wrapArtLiability')
    })
    mycollection.artCarouselNetValue().then($widgetvalue => {
      const widgetvaluetext = $widgetvalue.text().replace(currency, "");
      cy.log(widgetvaluetext)
      cy.wrap(widgetvaluetext.replace('K', '')).as('wrapArtNetValue')
    })

    mycollection.createButton().should('not.be.disabled').click()
    mycollection.artCreatedNotification().should('exist')
  })
  
  it('Check the value widget', function () {
    cy.log('wrap result is ' + this.wrapvalue)
    const wrapvalueconst = Number(this.wrapvalue) + newValue
    cy.log(wrapvalueconst)
    mainpage.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))
  })

  it('Check the liability widget', function () {
    cy.log('wrap result is ' + this.wrapliability)
    const wrapliabilityconst = Number(this.wrapliability)
    cy.log(wrapliabilityconst)
    mainpage.cbLiabilityWidget().should('have.text', currency + internationalNumberFormat.format(wrapliabilityconst) )
  })

  it('Check the Net value widget', function () {
    cy.log('wrap result is ' + this.wrapnetvalue)
    const wrapnetvaluetyconst = Number(this.wrapnetvalue) + newValue
    cy.log(wrapnetvaluetyconst)
    mainpage.cbNetValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapnetvaluetyconst))
  })
  it('Check the Art carousele Value widget', function () {
    cy.log('wrap result is ' + this.wrapart)
    const wrapvalueconst = Number(this.wrapart) + 1
    cy.log(nFormatter(wrapvalueconst))
    mycollection.artCarouselValue().should('have.text', currency + nFormatter(wrapvalueconst))
  })

  it('Check the Art carousele Liablility widget', function () {
    cy.log('wrap result is ' + this.wrapArtLiability)
    const wrapliabilityconst = Number(this.wrapArtLiability)
    cy.log(nFormatter(wrapliabilityconst))
    mycollection.artCarouselLiability().should('have.text', currency + nFormatter(wrapliabilityconst))
  })

  it('Check the Art carousele Net Value widget', function () {
    cy.log('wrap result is ' + this.wrapArtNetValue)
    const wrapnetvaluetyconst = Number(this.wrapArtNetValue) + 1
    cy.log(nFormatter(wrapnetvaluetyconst))
    mycollection.artCarouselNetValue().should('have.text', currency + nFormatter(wrapnetvaluetyconst))

  })
})

