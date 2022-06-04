import Mainpage from '../../../pageObjects/mainPage'
import Mycollection from '../../../pageObjects/myCollection'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Wine module tests', function () 
{
    const mainpage = new Mainpage()
    const mycollection = new Mycollection()
        
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
    
    it('Go to the My wine page and add a new wine manually', function()
    {
        cy.goToLoginPage()
        cy.loginCommand("automationtests3@gmail.com", "testuser1")
        mainpage.homePageUrl()

        mainpage.goToMyCollection({ timeout: 20000 }).click()
        cy.url().should('eq', `${Cypress.config().baseUrl}collections/all-assets/dashboard`)
        
        mycollection.winesTab().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}collections/wine/summary`)
        cy.wait(500)
        mycollection.myCollectionPlusButton().click()
        mycollection.createNewWine().click()
        cy.contains('Wine').should('exist')

        mycollection.wineProducer().type('autotestWineProducer').should('have.value', 'autotestWineProducer')
        cy.get('[role="menuitem"]', { timeout: 20000 }).contains(/autotestWineProducer/).trigger("click")
        mycollection.wineName().type('testname').should('have.value', 'testname')
        mycollection.wineVintage().type('2000').should('have.value', '2000')
        mycollection.pricePerBottle().type('1000').should('have.value', '1,000')
        cy.wait(300)

        mycollection.createButton().click()
        mycollection.wineCreatedNotification().should('exist')
    })  
//     it('Go to the My wine page, add a new wine from catalog', function()
//     {   
//         cy.goToLoginPage()
//         cy.loginCommand("automationtests3@gmail.com", "testuser1")
//         mainpage.homePageUrl()

//         mainpage.goToMyCollection({ timeout: 20000 }).click()
//         cy.url().should('eq', `${Cypress.config().baseUrl}collections/all-assets/dashboard`)
        
//         mycollection.winesTab().click()
//         cy.url().should('eq', `${Cypress.config().baseUrl}collections/wine/summary`)
//         cy.wait(500)
//         mycollection.myCollectionPlusButton().click()
// })
})


