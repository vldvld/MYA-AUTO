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
    cy.loginCommand("automationtests5@gmail.com", "testuser1")
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
    mycollection.shouldExistPropertySearch()
    cy.get('li').last().click()

    mycollection.purcasePriceArt().type('1000').should('have.value', '1,000')

    cy.wait(500) //I use this wait to prevent the 0 asset balance issue 

    cy.contains('Save and Close').should('not.be.disabled').click()
    mycollection.OtherCollectablesAssetCreatedNotification().should('exist')
  })
})

