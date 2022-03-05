import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import Mainpage from '../../../pageObjects/mainPage'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Sign up flow / log in flow tests', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage = new Mainpage()

    //Create random email and use it for the registration and login process 
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const testemail = `testemail${id}` + "@nonexistentdomain.com"

    
    it('Check the page title', function()
    {
        cy.goToLoginPage()
        cy.title().should('eq', 'MyAssets.com - The Best Life Organisational Tool')
    })
    it('Create a new user', function ()
    { 
        signup.createNewAccountButton().click()
        signup.userName().type('TestAutoFirstName').should('have.value', 'TestAutoFirstName')
        signup.email().type(testemail).should('have.value', testemail)
        signup.submitButton().should('be.disabled')
        signup.password().type('testuser1').should('have.value', 'testuser1')
        signup.termsCheckBox().click()
        cy.wait(200)
        signup.submitButton().click()
        cy.log('Created a new user, email:' + testemail + ', password: testuser1' )
    })
    it('Check the "change account? button"', function ()
    {
        cy.contains('change account?', { timeout: 25000 }).click()
        cy.url().should('eq', `${Cypress.config().baseUrl}auth/login`)
    })
    it('Log in using created credentials to unsubsribed account', function() 
    {
        login.email().type(testemail).should('have.value', testemail)
        login.password().type('testuser1').should('have.value', 'testuser1')
        login.submitButton().click()
        cy.wait(300)
        signup.nextButton().trigger('mouseover').trigger('click')
        
        cy.log(Cypress.config().baseUrl)
        cy.url().should('eq', `${Cypress.config().baseUrl}`)
    })
    it('TEST FUCKING STRIPE', function() 
    {
        signup.stripeEmail().type(testemail, { timeout: 30000 }).should('have.value', testemail)
        signup.stripeCard().type('4242424242424242', { timeout: 30000 })
        signup.stripeExpDate().type('1232', { timeout: 30000 })
        signup.stripeCvc().type('987', { timeout: 30000 })
        signup.stripePostal().type('12345', { timeout: 30000 })
        signup.subscribeButton().click()
        signup.selectButton().trigger("click").trigger("click")
    })

    it('Logout', function ()
    {
    
        mainpage.personalAccountMenu({ timeout: 20000 }).click()
        cy.contains('Personal Account').should('exist')
        mainpage.signOut().click()
        cy.url().should('eq', `${Cypress.config().baseUrl}auth/login`)
    })
})


