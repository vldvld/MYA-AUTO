import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import Mainpage from '../../../pageObjects/mainPage'
import Mycollection from '../../../pageObjects/myCollection'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Creating a new Wine', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage = new Mainpage()
    const mycollection = new Mycollection()

    //Create random email and use it for the registration and login process 
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const testemail = `testemail${id}` + "@nonexistentdomain.com"

    
    it('Go to the My wine page, create a new wine manually', function()

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
        cy.contains('Add wine to collection').should('exist')

        mycollection.wineVintage().type('2000').should('have.value', '2000')
        mycollection.wineName().type('testname').should('have.value', 'testname')
        mycollection.pricePerBottle().type('1000').should('have.value', '1,000').tab().tab().type('1').tab().type('1')
        mycollection.nextButton().click().click().click()
        mycollection.saveAndClose().click()
        mycollection.wineCreatedNotification().should('exist')



        // mycollection.artistField().type('Bob Evans').should('have.value', 'Bob Evans')
        // cy.get('[role="menuitem"]', {timeout: 20000 }).contains('Bob Evans').trigger("click")
        // mycollection.titleField().type(testName).should('have.value', testName)
        // mycollection.artTypeField().click()
        // cy.get('#artType-option-1').click()
        // mycollection.nextButton().click().click()
        // mycollection.listPriceField().type('1000').should('have.value', '1,000')
        // cy.get('#discount').tab().type('1')
        // mycollection.nextButton().click().click().click()
        // mycollection.saveAndClose().click()

        // mycollection.artCreatedNotification().should('exist') 
    })  
it('Go to the My wine page, create a new wine manually', function()

    {    
})
})


