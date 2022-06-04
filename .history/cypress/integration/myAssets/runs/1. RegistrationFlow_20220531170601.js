import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import Mainpage from '../../../pageObjects/mainPage'

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

describe('Sign up flow / Sign in flow tests', function () 
{
    const login = new Login()
    const signup = new Signup()
    const mainpage = new Mainpage()

    // Create random email and use it for the registration and login flow 
    const uuid = () => Cypress._.random(0, 1e6)
    const id = uuid()
    const testemail = `testemail${id}` + "@nonexistentdomain.com"
    
    it('Go to the login page, check the page title', function()
    {
    //    cy.goToLoginPage()
        cy.title().should('eq', 'MyAssets.com - The Best Life Organisational Tool')
    })
    it('Create a new user, log the created user info', function ()
    { 
        signup.createNewAccountButton().click()
        signup.userName().type('TestAutoFirstName').should('have.value', 'TestAutoFirstName')
        signup.email().type(testemail).should('have.value', testemail)
        signup.submitButton().should('be.disabled')
        signup.password().type('testuser1').should('have.value', 'testuser1')
        signup.termsCheckBox().click()
        cy.wait(300)
        signup.submitButton().click()
        cy.log('Created a new user, email:' + testemail + ', password: testuser1' )
    })
    it('Check the "change account? feature"', function ()
    {
        cy.contains('change account?',{timeout: 25000}).click()
        mainpage.homePageUrl()
    })
    it('Log in using created credentials to unsubsribed account', function() 
    {
        login.email().type(testemail).should('have.value', testemail)
        login.password().type('testuser1').should('have.value', 'testuser1')
        login.submitButton().click()
        cy.get('[type="radio"], [value="200"]',{timeout: 25000}).should('exist')
        signup.nextButton().trigger('mouseover').trigger('click')
        cy.log(Cypress.config().baseUrl)
        cy.url().should('eq', `${Cypress.config().baseUrl}`)
    })
    it('Test the Annual subscription flow', function ()
    {
        signup.stripeEmail().type(testemail, { timeout: 30000 }).should('have.value', testemail)
        signup.stripeCard().type('4242424242424242', { timeout: 30000 })
        signup.stripeExpDate().type('1232', { timeout: 30000 })
        signup.stripeCvc().type('987', { timeout: 30000 })
        signup.stripePostal().type('12345', { timeout: 30000 })
        signup.subscribeButton().click()
        cy.contains('Your account is ready!', {timeout: 30000}).should('exist')
        cy.contains('Start MyAssets').click()
        cy.contains('Welcome to MyAssets', { timeout: 30000 }).should('exist')
        signup.selectButton({ timeout: 30000 }).trigger("click").trigger("click")
    })
    it('Test the Logout feature', function ()
    {
        mainpage.personalAccountMenu({timeout: 25000 }).click()
        cy.contains('Personal Account').should('exist')
        mainpage.signOut().click()
        mainpage.homePageUrl()
    })
    it('Log in using created credentials using a prepared subscribed account', function() 
    { 
        cy.goToLoginPage()
        login.email().type(testemail).should('have.value', testemail)
        login.password().type('testuser1').should('have.value', 'testuser1')
        login.submitButton().click()
        mainpage.homePageUrl()
    })
    it('Account settings - Check the default user settings', function()
    {
        mainpage.personalAccountMenu().click()
        mainpage.accountSettings().click()
        cy.contains('TestAutoFirstName').should('exist')
        cy.contains(testemail).should('exist')
        cy.contains('USD').should('exist')
        cy.contains('50,015,000.00').should('exist')
        cy.contains('EN').should('exist')
        cy.contains('MM/DD/YYYY').should('exist')
    })
    it('Billing and Subscription - Check the default user settings', function()
    {
        mainpage.personalAccountMenu().click()
        mainpage.billingAndSubscription().click()
        cy.contains('Annual plan').should('exist')
        cy.contains('USD 200 per year').should('exist')
        cy.contains('Trial').should('exist')
        cy.contains('4242').should('exist')
        cy.contains(testemail).should('exist')
    })
    it('Logout', function ()
    {
        mainpage.personalAccountMenu().click()
        mainpage.signOut().click()
        mainpage.homePageUrl()
    })
})