import Login from '../../../pageObjects/login'
import Signup from '../../../pageObjects/signup'
import Mainpage from '../../../pageObjects/mainPage'

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
        signup.signUpTab().click()
        signup.firstName().type('TestAutoFirstName').should('have.value', 'TestAutoFirstName')
        signup.lastName().type('TestAutoLastName').should('have.value', 'TestAutoLastName')
        signup.email().type(testemail).should('have.value', testemail)
        signup.submitButton().should('be.disabled')
        signup.password().type('testuser1').should('have.value', 'testuser1')
        signup.termsCheckBox().click()
        signup.submitButton().click().click()
        cy.log('Created a new user, email:' + testemail + ', password: testuser1' )
    })
    it('Check the "change account? button"', function ()
    {
        cy.contains('change account?').click()
        cy.url().should('eq', 'https://myassetstest.web.app/auth/login')
    })
    it('Log in using created credentials to unsubsribed account', function() 
    {
        login.email().type(testemail).should('have.value', testemail)
        login.password().type('testuser1').should('have.value', 'testuser1')
        login.submitButton().click()
        cy.url().should('eq', 'https://myassetstest.web.app/auth/login')
    })
    it('Monthly subscription flow',function ()
    {
        cy.contains('Choose your subscription plan')
        signup.monthlyCompleteButton().click()
        signup.backButtonStripeForm().click()
        cy.contains('Choose your subscription plan')
        signup.monthlyCompleteButton().click()
        cy.contains('Monthly').should('exist')
        cy.contains('USD 20').should('exist')
        signup.stripeEmail().type(testemail).should('have.value', testemail)
        signup.stripeCard().type('4242424242424242')
        signup.stripeExpDate().type('1232')
        signup.stripeCvc().type('987')
        signup.stripePostal().type('12345')
        signup.subscribeButton().click()
        cy.contains('Subscription created!',{ timeout: 20000 })
        signup.completeButton().click()
        signup.selectButton({ timeout: 20000 }).click()
    })

    it('Logout', function ()
    {
        mainpage.personalAccountMenu({ timeout: 20000 }).click()
        cy.contains('Personal Account').should('exist')
        mainpage.signOut().click()
        cy.url().should('eq', 'https://myassetstest.web.app/auth/login')
    })
    it('Log in using created credentials for a subscribed account', function() 
    { 
        cy.goToLoginPage()
        login.email().type(testemail).should('have.value', testemail)
        login.password().type('testuser1').should('have.value', 'testuser1')
        login.submitButton().click()
        cy.url().should('eq', 'https://myassetstest.web.app/auth/login')
    })
    it('Account settings - Check the default user settings', function()
    {
        mainpage.personalAccountMenu().click()
        mainpage.accountSettings().click()
        cy.contains('TestAutoFirstName').should('exist')
        cy.contains('TestAutoLastName').should('exist')
        cy.contains(testemail).should('exist')
        cy.contains('USD').should('exist')
        cy.contains('Europe/Kiev +02:00').should('exist')
        cy.contains('50,015,000.00').should('exist')
        cy.contains('EN').should('exist')
        cy.contains('MM/DD/YYYY').should('exist')

    })
    it('Billing and Subscription - Check the default user settings', function()
    {
        mainpage.personalAccountMenu().click()
        mainpage.billingAndSubscription().click()
        cy.contains('Monthly').should('exist')
        cy.contains('USD 20 per month').should('exist')
        cy.contains('Trial').should('exist')
        cy.contains('4242').should('exist')
        cy.contains(testemail).should('exist')
    })
    it('Logout', function ()
    {
        mainpage.personalAccountMenu().click()
        mainpage.signOut().click()
        cy.url().should('eq', 'https://myassetstest.web.app/auth/login')
    })
})


