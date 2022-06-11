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
    cy.loginCommand("automationtests5@gmail.com", "testuser1")
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
    mycollection.shouldExistPropertySearch().should('exist')
    cy.get('li').last().click()

    mybelongings.priceField().type(newValue).should('have.value', '1,000')

    cy.wait(500) //I use this wait to prevent the 0 asset balance issue 
    
    mybelongings.saveAndClose().should('not.be.disabled').click()
    mybelongings.myBelongingsCreatedNotification().should('exist') 
  })  
})

