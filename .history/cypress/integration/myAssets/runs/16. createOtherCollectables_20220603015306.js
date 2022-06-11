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

  // Clear a web cache before tests to prevent browser issues 
  afterEach(() => {
    if (window.navigator && navigator.serviceWorker) {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister()
          })
        })
    }
  })

  it('Go to the My collectibles page and create an other collectables asset', function () {
    cy.goToLoginPage()
    cy.loginCommand("automationtests5@gmail.com", "testuser1")
    mainpage.homePageUrl()

    mainpage.goToMyCollection({ timeout: 20000 }).click()
    cy.url().should('eq', `${Cypress.config().baseUrl}collections/all-assets/dashboard`)
    //cy.wait(500)
    mycollection.otherCollectablesTab().click()
    mycollection.myCollectionPlusButton().click()

    mycollection.collectionTypeField().click()
    cy.wait(800)
    cy.get('li').last().click().should('have.value', 'Antique crosses')

    mycollection.manufactureField().click()
    cy.wait(800)
    cy.get('li').last().click()

    mycollection.modelTypeField().click()
    cy.wait(800)
    cy.get('li').last().click()

    cy.get('#linkedPropertyAsLocation').click()
    cy.wait(800)
    cy.get('li').first().click()

    mycollection.purcasePriceArt().type('1000').should('have.value', '1,000')

    mycollection.createButton().click()
    mycollection.OtherCollectablesAssetCreatedNotification().should('exist')
  })
})

