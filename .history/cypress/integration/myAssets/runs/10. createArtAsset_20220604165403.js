import MainPage from '../../../pageObjects/mainPage'
import myCollection from '../../../pageObjects/myCollection'

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

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
    cy.contains(/AUTOMATEDPROPERTY/,{ timeout: 20000 })
    cy.get('li').last().click()

    mycollection.createButton().should('not.be.disabled').click()
    mycollection.artCreatedNotification().should('exist')
  })
})

