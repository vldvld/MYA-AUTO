import MainPage from '../../../pageObjects/mainPage'
import myCollection from '../../../pageObjects/myCollection'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Creating an Art asset', function () {

  beforeEach(() => {
  cy.goToLoginPage()
  cy.loginCommand("mya-automated-tests@gmail.com", "mya-automated-tests@gmail.com")
  mainpage.goToMyCollection().click()
  mycollection.artTab().click()
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
  
  it('Check the value widget', function () {
    cy.log('wrap result is ' + this.wrapvalue)
    const wrapvalueconst = Number(this.wrapvalue) + newValue
    cy.log(wrapvalueconst)
    mainpage.cbValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapvalueconst))
  
    cy.log('wrap result is ' + this.wrapliability)
    const wrapliabilityconst = Number(this.wrapliability)
    cy.log(wrapliabilityconst)
    mainpage.cbLiabilityWidget().should('have.text', currency + internationalNumberFormat.format(wrapliabilityconst) )

    cy.log('wrap result is ' + this.wrapnetvalue)
    const wrapnetvaluetyconst = Number(this.wrapnetvalue) + newValue
    cy.log(wrapnetvaluetyconst)
    mainpage.cbNetValueWidget().should('have.text', currency + internationalNumberFormat.format(wrapnetvaluetyconst))
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
  // it('Check the Art carousele Value widget', function () {
  //   cy.log('wrap result is ' + this.wrapArtValue)
  //   const wrapvalueconst = Number(this.wrapArtValue) + 1
  //   cy.log(nFormatter(wrapvalueconst))

  //   mycollection.artCarouselValue().should('have.text', currency + wrapvalueconst + 'K')
  // })
  // it('Check the Art carousele Liablility widget', function () {
  //   mycollection.artCarouselLiability().should('have.text', currency + this.wrapArtLiability)

  // })
  // it('Check the Art carousele Net Value widget', function () {
  //   cy.log('wrap result is ' + this.wrapArtNetValue)
  //   const wrapnetvaluetyconst = Number(this.wrapArtNetValue) + 1
   
  //   cy.log(nFormatter(wrapnetvaluetyconst))
  //   mycollection.artCarouselNetValue().should('have.text', currency + wrapnetvaluetyconst + 'K')

  // })
})

